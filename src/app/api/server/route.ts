import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { getAppDetails } from '../actions/steam';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { appId } = data;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const appData = (await getAppDetails(appId)) as any;

        await db.app.upsert({
            where: { id: appId },
            update: appData,
            create: { id: appId, ...appData },
        });

        const server = await db.server.create({
            data: {
                ...data,
                userId,
                channels: {
                    create: [{ name: 'general', userId, isDefault: true }],
                },
                members: {
                    create: [{ userId, role: MemberRole.ADMIN }],
                },
            },
            include: {
                channels: {
                    where: {
                        isDefault: true,
                    },
                    select: {
                        id: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVERS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
