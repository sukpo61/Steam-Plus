import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { images, channelId, ...postData } = data;

        const post = await db.post.create({
            data: {
                ...postData,
                community: {
                    connectOrCreate: {
                        where: { id: channelId },
                        create: { id: channelId, name: 'name' },
                    },
                },
            },
        });

        if (images && images.length > 0) {
            const imagePromises = images.map((image: any) => {
                return db.image.create({
                    data: {
                        src: image.src,
                        post: {
                            connect: {
                                id: post.id,
                            },
                        },
                    },
                });
            });
            await Promise.all(imagePromises);
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('COMMUNITY_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const { channelId } = params;
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pagesize') || '10', 10);
        const offset = (page - 1) * pageSize;
        const totalCount = await db.post.count({
            where: {
                channelId,
            },
        });

        const posts = await db.post.findMany({
            where: {
                channelId,
            },
            include: { images: true },
            orderBy: {
                createdAt: 'desc',
            },
            skip: offset,
            take: pageSize,
        });

        const result = await Promise.all(
            posts.map(async (post) => ({
                ...post,
                commentsCount: await db.comment.count({
                    where: {
                        postId: post.id,
                    },
                }),
            })),
        );

        return NextResponse.json({ data: result, totalCount, pageSize });
    } catch (error) {
        console.error('COMMUNITIES_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
