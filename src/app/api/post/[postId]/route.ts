import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(_: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        const server = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                images: true,
            },
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        const server = await db.post.delete({
            where: {
                id: postId,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, ...data } = await req.json();

        const updatedPost = await db.post.update({
            where: {
                id: id,
            },
            data: data,
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
