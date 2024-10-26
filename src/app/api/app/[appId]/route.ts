import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAppDetails } from '../../actions/steam';

const SERVERS_BATCH = 18;

export async function GET(req: Request, { params }: { params: { appId: string } }) {
    try {
        const appId = parseInt(params.appId);
        const { searchParams } = new URL(req.url);

        let appDetail = (await db.app.findUnique({
            where: {
                id: appId,
            },
        })) as any;

        if (!appDetail) {
            appDetail = await getAppDetails(appId);
        }

        const cursor = searchParams.get('cursor');

        let servers = [];

        if (cursor) {
            servers = await db.server.findMany({
                take: SERVERS_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    appId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            });
        } else {
            servers = await db.server.findMany({
                take: SERVERS_BATCH,
                where: {
                    appId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: {
                        select: {
                            avatar: true,
                        },
                    },
                    channels: {
                        take: 1,
                        orderBy: {
                            createdAt: 'asc',
                        },
                        select: {
                            id: true,
                        },
                    },
                },
            });
        }

        let nextCursor = null;

        if (servers.length === SERVERS_BATCH) {
            nextCursor = servers[SERVERS_BATCH - 1].id;
        }

        const serversPromise = servers.map(async (server) => ({
            ...server,
            memberCount: await db.member.count({
                where: {
                    serverId: server.id,
                },
            }),
        }));

        const serversResult = await Promise.all(serversPromise);

        return NextResponse.json({
            data: serversResult,
            nextCursor,
            appDetail,
        });
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
