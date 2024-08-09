import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pagesize') || '10', 10);
        const offset = (page - 1) * pageSize;
        const totalCount = await db.post.count();

        const posts = await db.post.findMany({
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
