import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(req: Request) {
    try {
        const totalCount = await db.post.count();

        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pagesize = parseInt(searchParams.get('pagesize') || '10', 10);
        const offset = (page - 1) * pagesize;

        const posts = await db.post.findMany({
            include: { images: true },
            orderBy: {
                createdAt: 'desc',
            },
            skip: offset,
            take: pagesize,
        });
        return NextResponse.json({ data: posts, totalCount, pageSize: pagesize });
    } catch (error) {
        console.error('COMMUNITIES_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
