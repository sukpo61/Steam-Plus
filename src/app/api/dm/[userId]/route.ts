import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { log } from 'node:console';

const DM_MESSAGES_BATCH = 10;

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = req.headers.get('User-Id');
        const { userId: dmuserId } = params;

        const cursor = searchParams.get('cursor');

        if (!userId) {
            return new NextResponse('User ID missing', { status: 400 });
        }

        let conversation;

        conversation = await db.conversation.findFirst({
            where: {
                OR: [
                    { userOneId: userId, userTwoId: dmuserId },
                    { userOneId: dmuserId, userTwoId: userId },
                ],
            },
        });

        if (!conversation) {
            conversation = await db.conversation.create({
                data: {
                    userOneId: userId,
                    userTwoId: dmuserId,
                },
            });
        }

        console.log('conversation', conversation);

        let dmMessages: any[] = [];

        if (cursor) {
            dmMessages = await db.directMessage.findMany({
                take: DM_MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId: conversation?.id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                        },
                    },
                    images: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            dmMessages = await db.directMessage.findMany({
                take: DM_MESSAGES_BATCH,
                where: {
                    conversationId: conversation?.id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                        },
                    },
                    images: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        let nextCursor = null;

        if (dmMessages.length === DM_MESSAGES_BATCH) {
            nextCursor = dmMessages[DM_MESSAGES_BATCH - 1].id;
        }

        const friendShip = await db.friendship.findFirst({
            where: {
                status: 'ACCEPTED',
                OR: [
                    { senderId: userId, receiverId: dmuserId },
                    { senderId: dmuserId, receiverId: userId },
                ],
            },
        });

        const user = await db.user.findUnique({
            where: {
                id: dmuserId,
            },
            select: {
                id: true,
                avatar: true,
                name: true,
            },
        });

        return NextResponse.json({
            items: dmMessages,
            conversationId: conversation?.id,
            user: { ...user, friendShipId: friendShip?.id },
            nextCursor: null,
        });
    } catch (error) {
        console.log('[MESSAGES_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const { channelId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const channel = await db.channel.delete({
            where: {
                id: channelId,
            },
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const data = await req.json();
        const { channelId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const channel = await db.channel.update({
            where: {
                id: channelId,
            },
            data,
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
