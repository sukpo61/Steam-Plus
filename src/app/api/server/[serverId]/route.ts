import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const { serverId } = params;

        const server = await db.server.findUnique({
            where: {
                id: serverId,
            },
            select: {
                app: {
                    select: {
                        name: true,
                        steam_appid: true,
                        background: true,
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const { serverId } = params;

        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.delete({
            where: {
                id: serverId,
                userId,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const { name } = await req.json();
        const { serverId } = params;

        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                userId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
