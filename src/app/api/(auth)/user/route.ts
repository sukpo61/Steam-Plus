import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(req: Request) {
    try {
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const userRecord = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                steamId: true,
                name: true,
                avatar: true,
                library: {
                    where: {
                        userId,
                    },
                    select: {
                        app: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                members: {
                    select: {
                        server: {
                            select: {
                                id: true,
                                userId: true,
                                app: {
                                    select: {
                                        id: true,
                                        header_image: true,
                                        name: true,
                                    },
                                },
                                name: true,
                                channels: {
                                    take: 1,
                                    select: {
                                        id: true,
                                    },
                                    orderBy: {
                                        createdAt: 'asc',
                                    },
                                },
                            },
                        },
                        role: true,
                    },
                },
                conversationsInitiated: {
                    where: {
                        userOneId: userId,
                    },
                    include: {
                        userTwo: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },
                conversationsReceived: {
                    where: {
                        userTwoId: userId,
                    },
                    include: {
                        userOne: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userRecord) return;

        const user = {
            ...userRecord,
            servers: userRecord?.members.map(({ server, role }) => ({
                ...server,
                role,
            })),
            conversations: [
                ...userRecord.conversationsInitiated.map(({ id, userTwo }) => ({
                    id,
                    user: userTwo,
                })),
                ...userRecord.conversationsReceived.map(({ id, userOne }) => ({
                    id,
                    user: userOne,
                })),
            ],
        } as any;

        delete user.members;
        delete user.conversationsInitiated;
        delete user.conversationsReceived;

        return NextResponse.json(user);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
