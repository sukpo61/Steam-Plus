import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET() {
    try {
        const server = await db.post.update({
            where: {
                id: '',
            },
            data: {},
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
export async function DELETE() {
    try {
        const server = await db.post.update({
            where: {
                id: '',
            },
            data: {},
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
export async function PATCH() {
    try {
        const server = await db.post.update({
            where: {
                id: '',
            },
            data: {},
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
