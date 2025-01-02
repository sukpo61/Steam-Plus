import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { getAppDetails } from '@/app/api/actions/steam';

export async function GET(req: Request) {
    try {
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const pendingFriendRequests = await db.friendship.findMany({
            where: {
                status: 'PENDING',
                receiverId: userId,
            },
            include: {
                sender: { select: { id: true, name: true, avatar: true } },
            },
        });

        return NextResponse.json(pendingFriendRequests);
    } catch (error) {
        console.error('COMMUNITY_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
