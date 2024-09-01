import { getPlayerSummaries } from '@/app/api/actions/steam';
import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET(req: Request, { params }: { params: { postId: string } }) {
    const { searchParams } = new URL(req.url);
    const cookieStore = cookies();

    const steamIdUrl = searchParams.get('openid.claimed_id');

    if (!steamIdUrl) {
        return new NextResponse('Steam ID not provided', { status: 400 });
    }

    try {
        const steamId = steamIdUrl.toString().split('/').pop() as string;

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

        const newRefreshToken = jwt.sign({ type: 'refresh' }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        await db.refreshToken.upsert({
            where: { userId: user.id },
            update: {
                token: newRefreshToken,
                expiresAt: new Date(Date.now() + EXPIRE_TIME),
            },
            create: {
                token: newRefreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + EXPIRE_TIME),
            },
        });

        cookieStore.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: EXPIRE_TIME / 1000,
        });

        const accessToken = jwt.sign({ userId: user.id, type: 'access' }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        const redirectUrl = new URL('/signin', req.url);
        redirectUrl.searchParams.set('accessToken', accessToken);

        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.log('Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
