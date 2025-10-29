import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function PATCH(req: Request, props: { params: Promise<{ commentId: string }> }) {
    const params = await props.params;
    try {
        const { isSubmitted } = await req.json();
        const userId = req.headers.get('User-Id');
        const { commentId } = params;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const commentLike = await db.commentLike.findUnique({
            where: {
                commentId_userId: {
                    commentId,
                    userId,
                },
            },
        });

        console.log('commentLike', commentLike);

        if (isSubmitted) {
            commentLike &&
                (await db.commentLike.delete({
                    where: {
                        id: commentLike.id,
                    },
                }));
        } else {
            !commentLike &&
                (await db.commentLike.create({
                    data: {
                        commentId,
                        userId,
                    },
                }));
        }

        return NextResponse.json({});
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
