import { getOwnedGames } from '@/app/api/actions/steam';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { appId: string } }) {
    try {
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        const userRecord = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                steamId: true,
            },
        });

        const steamId = userRecord?.steamId;

        const OwnedGames = await getOwnedGames(steamId);

        return NextResponse.json(OwnedGames);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
