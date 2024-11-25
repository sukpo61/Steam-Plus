import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

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
