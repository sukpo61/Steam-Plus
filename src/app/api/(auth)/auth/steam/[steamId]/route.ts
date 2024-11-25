import { getAppDetails, getOwnedGames, getPlayerSummaries } from '@/app/api/actions/steam';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';

const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET(req: Request, { params }: { params: { steamId: string } }) {
    const { steamId } = params;

    try {
        const userSummary = await getPlayerSummaries(steamId);

        const user = await db.user.upsert({
            where: { steamId },
            update: {
                ...userSummary,
            },
            create: {
                ...userSummary,
                steamId,
            },
        });

        const OwnedGames = await getOwnedGames(steamId);
        const appIdList = OwnedGames?.map((item) => item.appid);

        if (appIdList && appIdList.length > 0) {
            const appPromises = appIdList?.map(async (appId) => {
                const appData = (await getAppDetails(appId)) as any;

                await db.app.upsert({
                    where: { id: appId },
                    update: appData,
                    create: { id: appId, ...appData },
                });

                await db.library.upsert({
                    where: {
                        appId_userId: {
                            appId: appId,
                            userId: user.id,
                        },
                    },
                    update: {},
                    create: {
                        appId: appId,
                        userId: user.id,
                    },
                });
            });
            await Promise.all(appPromises);
        }

        const accessToken = jwt.sign({ userId: user.id, type: 'access' }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });
        const refreshToken = jwt.sign({ type: 'refresh' }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        await db.refreshToken.upsert({
            where: { userId: user.id },
            update: {
                token: refreshToken,
                expiresAt: new Date(Date.now() + EXPIRE_TIME),
            },
            create: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + EXPIRE_TIME),
            },
        });

        const token = {
            accessToken,
            refreshToken,
        };

        return NextResponse.json(token);
    } catch (error) {
        console.log('Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
