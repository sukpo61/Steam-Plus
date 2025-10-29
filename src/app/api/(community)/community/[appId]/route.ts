import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { getAppDetails } from '@/app/api/actions/steam';

export async function POST(req: Request, { params }: { params: { appId: string } }) {
    try {
        const { appId } = await req.json();
        const userId = req.headers.get('User-Id');
        const data = await req.json();
        const { images, ...postData } = data;

        const { name, header_image, background } = await getAppDetails(appId);

        const post = await db.post.create({
            data: {
                ...postData,
                appId,
                appData: { name, header_image, background },
                user: {
                    connect: { id: userId },
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

export async function GET(req: Request, props: { params: Promise<{ appId: string }> }) {
    const params = await props.params;
    try {
        const appId = parseInt(params.appId);
        const { searchParams } = new URL(req.url);

        const term = searchParams.get('term');
        const order = searchParams.get('order');
        const category = searchParams.get('category');

        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pagesize') || '10', 10);
        const offset = (page - 1) * pageSize;

        const totalCount = await db.post.count({
            where: {
                appId: appId,
            },
        });

        const posts = await db.post.findMany({
            where: {
                appId: appId,
            },
            include: { images: true },
            orderBy:
                order === 'desc'
                    ? {
                          createdAt: 'desc',
                      }
                    : {
                          viewCount: 'desc',
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

        const { name, header_image, background } = await getAppDetails(appId);
        const appData = { name, header_image, background };

        return NextResponse.json({ data: result, appData, totalCount, pageSize });
    } catch (error) {
        console.error('COMMUNITIES_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
