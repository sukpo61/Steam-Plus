import { Comment } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

const COMMENTS_BATCH = 3;
const IMAGE_UPLOAD_LIMIT = 1;

export async function POST(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        const { images, ...commentsData } = await req.json();

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 401 });
        }

        const comment = await db.comment.create({
            data: {
                ...commentsData,
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
                    parentId: null,
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
                    parentId: null,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    images: true,
                },
            });
        }

        const totalCount = await db.comment.count({
            where: {
                postId,
            },
        });

        const result = await Promise.all(
            comments.map(async (comment) => ({
                comment,
                replysCount: await db.comment.count({
                    where: {
                        postId,
                        parentId: comment.id,
                    },
                }),
            })),
        );

        let nextCursor = null;

        if (comments.length === COMMENTS_BATCH) {
            nextCursor = comments[COMMENTS_BATCH - 1].id;
        }

        return NextResponse.json({
            data: result,
            totalCount,
            nextCursor,
        });
    } catch (error) {
        console.log('COMMENTS_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
