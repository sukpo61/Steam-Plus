import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { images, ...postData } = await req.json();
        const { postId } = params;

        await db.post.update({
            where: {
                id: postId,
            },
            data: postData,
        });

        const server = await db.post.findUnique({
            where: { id: postId },
            include: { images: true },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
