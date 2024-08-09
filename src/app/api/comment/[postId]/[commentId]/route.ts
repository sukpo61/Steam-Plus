import { Comment } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

const COMMENTS_BATCH = 6;
const IMAGE_UPLOAD_LIMIT = 1;

export async function POST(
    req: Request,
    { params }: { params: { postId: string; commentId: string } },
) {
    try {
        const { postId, commentId } = params;
        const { images, ...commentsData } = await req.json();

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 401 });
        }

        const comment = await db.comment.create({
            data: {
                ...commentsData,
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
    { params }: { params: { postId: string; commentId: string } },
) {
    try {
        const { postId, commentId } = params;
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get('cursor');

        let comments: Comment[] = [];

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
                include: {
                    images: true,
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
                include: {
                    images: true,
                },
            });
        }

        let nextCursor = null;

        if (comments.length === COMMENTS_BATCH) {
            nextCursor = comments[COMMENTS_BATCH - 1].id;
        }

        return NextResponse.json({
            data: comments,
            nextCursor,
        });
    } catch (error) {
        console.log('COMMENTS_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { commentId: string } }) {
    try {
        const { commentId } = params;

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

export async function PATCH(req: Request, { params }: { params: { commentId: string } }) {
    try {
        const { images, ...commentData } = await req.json();
        const { commentId } = params;

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 401 });
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
