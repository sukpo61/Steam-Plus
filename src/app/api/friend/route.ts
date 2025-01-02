import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = req.headers.get('User-Id');

        const type = searchParams.get('type');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        let friends: any = [];

        if (type === 'all') {
            const friendsRecord = await db.friendship.findMany({
                where: {
                    status: 'ACCEPTED',
                    OR: [{ senderId: userId }, { receiverId: userId }],
                },
                include: {
                    sender: { select: { id: true, name: true, avatar: true } },
                    receiver: { select: { id: true, name: true, avatar: true } },
                },
            });

            friends = await Promise.all(
                friendsRecord.map(async (item) => {
                    const isSender = item.senderId === userId;

                    const conversation = await db.conversation.findUnique({
                        where: {
                            userOneId_userTwoId: {
                                userOneId: item.senderId,
                                userTwoId: item.receiverId,
                            },
                        },
                        select: { id: true },
                    });

                    return {
                        id: item.id,
                        status: 'ACCEPTED',
                        type: isSender ? 'send' : 'receive',
                        user: isSender ? item.receiver : item.sender,
                        conversationId: conversation?.id ?? null,
                        createdAt: item.createdAt,
                    };
                }),
            );
        }

        if (type === 'pending') {
            const friendsRecord = await db.friendship.findMany({
                where: {
                    status: 'PENDING',
                    OR: [{ senderId: userId }, { receiverId: userId }],
                },
                include: {
                    sender: { select: { id: true, name: true, avatar: true } },
                    receiver: { select: { id: true, name: true, avatar: true } },
                },
            });

            friends = friendsRecord.map((item) => {
                const isSender = item.senderId === userId;

                return {
                    id: item.id,
                    status: 'PENDING',
                    type: isSender ? 'send' : 'receive',
                    user: isSender ? item.receiver : item.sender,
                    createdAt: item.createdAt,
                };
            });
        }

        return NextResponse.json(friends);
    } catch (error) {
        console.error('COMMUNITY_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
