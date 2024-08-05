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
                        postId: post.id,
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

export async function GET(_: Request, { params }: { params: { channelId: string } }) {
    const { channelId } = params;

    try {
        const posts = await db.post.findMany({
            where: {
                channelId,
            },
            include: { images: true },
        });

        return NextResponse.json({ data: posts, itemCount: 1, pageSize: 1 });
    } catch (error) {
        console.error('COMMUNITIES_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
