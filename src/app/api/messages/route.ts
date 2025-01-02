import { Message } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = req.headers.get('User-Id');

        const cursor = searchParams.get('cursor');
        const channelId = searchParams.get('channelId');

        if (!channelId) {
            return new NextResponse('Channel ID missing', { status: 400 });
        }

        let messages: Message[] = [];

        if (cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            user: true,
                        },
                    },
                    images: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            user: true,
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

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        const messagesResult = messages.map((message: any) => {
            const result = {
                ...message,
                user: message.member.user,
            };

            delete result.member;

            return result;
        });

        return NextResponse.json({
            items: messagesResult,
            nextCursor,
        });
    } catch (error) {
        console.log('[MESSAGES_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
