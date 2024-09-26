import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

const COMMENTS_BATCH = 3;
const IMAGE_UPLOAD_LIMIT = 1;

export async function POST(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
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
        console.error('COMMENTS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
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
                    parentId: null,
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
                    parentId: null,
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

        const commentCount = await db.comment.count({
            where: {
                postId,
            },
        });

        const result = await Promise.all(
            comments.map(async (comment) => {
                const isOwned = userId && comment.user?.id === userId;
                return {
                    comment: { ...comment, isOwned },
                    replysCount: await db.comment.count({
                        where: {
                            postId,
                            parentId: comment.id,
                        },
                    }),
                };
            }),
        );

        let nextCursor = null;

        if (comments.length === COMMENTS_BATCH) {
            nextCursor = comments[COMMENTS_BATCH - 1].id;
        }

        return NextResponse.json({
            data: result,
            commentCount,
            nextCursor,
        });
    } catch (error) {
        console.log('COMMENTS_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
