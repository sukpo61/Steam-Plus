import { getAppDetails } from '@/app/api/actions/steam';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { appId: string } }) {
    try {
        const appId = parseInt(params.appId);
        const { searchParams } = new URL(req.url);

        const appDetail = await getAppDetails(appId);

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pagesize') || '10', 10);
        const offset = (page - 1) * pageSize;
        const totalCount = await db.server.count({
            where: {
                appId,
            },
        });

        const servers = await db.server.findMany({
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
            skip: offset,
            take: pageSize,
        });

        const serversPromise = servers.map(async (server) => ({
            ...server,
            memberCount: await db.member.count({
                where: {
                    serverId: server.id,
                },
            }),
        }));

        const serversResult = await Promise.all(serversPromise);

        return NextResponse.json({ servers: serversResult, appDetail, totalCount });
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
