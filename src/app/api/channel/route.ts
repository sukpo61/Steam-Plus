import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const channel = await db.channel.create({
            data: {
                ...data,
                userId,
            },
        });

        return NextResponse.json(channel);
    } catch (error) {
        console.log('[SERVERS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
