import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(req: Request) {
    try {
        const userId = req.headers.get('User-Id');

        console.log('userId12', userId);

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await db.user.findUnique({
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
                servers: {
                    select: {
                        id: true,
                        app: {
                            select: {
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
            },
        });

        // const user = await db.user.findUnique({
        //     where: {
        //         id: userId,
        //     },
        //     include: {
        //         members: {
        //             include: {
        //                 server: true,
        //             },
        //         },
        //     },
        // });

        // const userResult = {
        //     ...user,
        //     servers: user?.members.map((member) => member.server),
        // };

        return NextResponse.json(user);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
