import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

const COMMENTS_BATCH = 6;
const IMAGE_UPLOAD_LIMIT = 1;

export async function POST(
    req: Request,
    props: { params: Promise<{ postId: string; commentId: string }> }
) {
    const params = await props.params;
    try {
        const { postId, commentId } = params;
        const { images, ...commentsData } = await req.json();
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 403 });
        }

        const comment = await db.comment.create({
            data: {
                ...commentsData,
                user: { connect: { id: userId } },
                parent: { connect: { id: commentId } },
                post: {
                    connect: { id: postId },
                },
            },
        });

        if (images && images.length > 0) {
            const imagePromises = images.map((image: any) => {
                return db.image.create({
                    data: {
                        src: image.src,
                        comment: {
                            connect: { id: comment.id },
                        },
                    },
                });
            });

            await Promise.all(imagePromises);
        }

        return NextResponse.json(comment);
    } catch (error) {
        console.error('COMMENT_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(
    req: Request,
    props: { params: Promise<{ postId: string; commentId: string }> }
) {
    const params = await props.params;
    try {
        const { postId, commentId } = params;
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get('cursor');
        const userId = req.headers.get('User-Id');

        let comments = [];

        if (cursor) {
            comments = await db.comment.findMany({
                take: COMMENTS_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    postId,
                    parentId: commentId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                        },
                    },
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    images: {
                        select: {
                            id: true,
                            src: true,
                        },
                    },
                },
            });
        } else {
            comments = await db.comment.findMany({
                take: COMMENTS_BATCH,
                where: {
                    postId,
                    parentId: commentId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        },
                    },
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    images: {
                        select: {
                            id: true,
                            src: true,
                        },
                    },
                },
            });
        }

        const result = await Promise.all(
            comments.map(async (comment) => {
                const isOwned = userId && comment.user?.id === userId;
                return {
                    ...comment,
                    isOwned,
                };
            }),
        );

        let nextCursor = null;

        if (comments.length === COMMENTS_BATCH) {
            nextCursor = comments[COMMENTS_BATCH - 1].id;
        }

        return NextResponse.json({
            data: result,
            nextCursor,
        });
    } catch (error) {
        console.log('COMMENTS_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ commentId: string }> }) {
    const params = await props.params;
    try {
        const { commentId } = params;
        const userId = req.headers.get('User-Id');

        const comment = await db.comment.findUnique({
            where: {
                id: commentId,
            },
            select: { userId: true },
        });

        if (userId !== comment?.userId) {
            return new NextResponse('Invalid user', { status: 401 });
        }

        await db.comment.deleteMany({
            where: {
                parentId: commentId,
            },
        });

        const server = await db.comment.delete({
            where: {
                id: commentId,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('COMMENT_DELETE', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ commentId: string }> }) {
    const params = await props.params;
    try {
        const { images, ...commentData } = await req.json();
        const { commentId } = params;
        const userId = req.headers.get('User-Id');

        const comment = await db.comment.findUnique({
            where: {
                id: commentId,
            },
            select: { userId: true },
        });

        if (userId !== comment?.userId) {
            return new NextResponse('Invalid user', { status: 401 });
        }

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 403 });
        }

        await db.comment.update({
            where: {
                id: commentId,
            },
            data: commentData,
        });

        const currentImages = await db.image.findMany({
            where: { commentId: commentId },
            select: { id: true },
        });

        const currentImageId = currentImages[0]?.id;

        const newImageId = images[0]?.id;

        if (currentImageId !== newImageId) {
            currentImageId &&
                (await db.image.delete({
                    where: {
                        id: currentImageId,
                    },
                }));

            newImageId &&
                (await db.image.create({
                    data: {
                        src: images[0].src,
                        comment: {
                            connect: { id: commentId },
                        },
                    },
                }));
        }

        const server = await db.post.findUnique({
            where: { id: commentId },
            include: { images: true },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error('COMMENT_PATCH', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
