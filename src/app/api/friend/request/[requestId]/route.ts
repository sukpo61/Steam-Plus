import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request, props: { params: Promise<{ requestId: string }> }) {
    const params = await props.params;
    try {
        const { requestId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const friendship = await db.friendship.update({
            where: { id: requestId },
            data: {
                status: 'ACCEPTED',
            },
        });

        return NextResponse.json({});
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ requestId: string }> }) {
    const params = await props.params;
    try {
        const { requestId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await db.friendship.delete({
            where: { id: requestId },
        });

        return NextResponse.json({});
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
