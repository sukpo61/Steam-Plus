import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request, props: { params: Promise<{ friendId: string }> }) {
    const params = await props.params;
    try {
        const { friendId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const friendship = await db.friendship.create({
            data: {
                senderId: userId,
                receiverId: friendId,
            },
        });

        return NextResponse.json(friendship);
    } catch (error) {
        console.log('FRIEND_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ friendId: string }> }) {
    const params = await props.params;
    try {
        const { friendId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await db.friendship.delete({
            where: { id: friendId },
        });

        return NextResponse.json({});
    } catch (error) {
        console.log('FRIEND_DELETE', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
