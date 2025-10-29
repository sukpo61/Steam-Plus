import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function PATCH(req: Request, props: { params: Promise<{ postId: string }> }) {
    const params = await props.params;
    try {
        const userId = req.headers.get('User-Id');
        const { postId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const postLike = await db.postLike.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });

        let result;

        if (postLike) {
            await db.postLike.delete({
                where: {
                    id: postLike.id,
                },
            });
        } else {
            await db.postLike.create({
                data: {
                    postId,
                    userId,
                },
            });
        }

        return NextResponse.json({});
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
