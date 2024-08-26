import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request) {
    try {
        const server = await db.community.update({
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
