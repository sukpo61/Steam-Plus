import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const apps = await db.app.findMany({
            select: {
                id: true,
                name: true,
                header_image: true,
                short_description: true,
                categories: true,
                genres: true,
                servers: {
                    select: {
                        members: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            orderBy: {},
        });

        const result = apps
            .map((app) => {
                const { id, name, header_image, short_description, servers, categories, genres } =
                    app;
                const membersCount = servers.reduce(
                    (accumulator, server) => accumulator + server.members.length,
                    0,
                );
                return {
                    id,
                    name,
                    header_image,
                    short_description,
                    categories,
                    genres,
                    serversCount: servers.length,
                    membersCount,
                };
            })
            .sort((a, b) => b.membersCount - a.membersCount || b.serversCount - a.serversCount);

        return NextResponse.json(result);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
