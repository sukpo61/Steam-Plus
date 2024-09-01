import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function refreshTokenValidate(refreshToken?: string) {
    let isRefreshTokenValid = false;

    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { type: string };
            if (decoded.type === 'refresh') {
                isRefreshTokenValid = true;
            }
        } catch (error) {
            isRefreshTokenValid = false;
        }
    }

    return isRefreshTokenValid;
}

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();

        const refreshToken = cookieStore.get('refreshToken')?.value;

        const validation = await refreshTokenValidate(refreshToken);

        if (!refreshToken) {
            return new NextResponse('Refresh token missing', { status: 403 });
        }

        if (!validation) {
            return new NextResponse('Refresh token is not validate', { status: 401 });
        }

        let userRecord = await db.refreshToken.findUnique({
            where: { token: refreshToken },
            select: {
                user: {
                    select: {
                        id: true,
                        steamId: true,
                    },
                },
            },
        });

        const userId = userRecord?.user?.id;
        const steamId = userRecord?.user?.steamId;

        if (!steamId || !userId) {
            throw new Error('User or SteamId not found');
        }

        const newAccessToken = jwt.sign(
            { userId: userId, type: 'access' },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1h',
            },
        );

        const response = new NextResponse(null, { status: 200 });
        response.headers.set('Authorization', newAccessToken);

        return response;
    } catch (error) {
        console.log('C', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
