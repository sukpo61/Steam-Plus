import { getAppDetails } from '@/app/api/actions/steam';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request) {
    try {
        const userId = req.headers.get('User-Id');
        const data = await req.json();
        const appId = parseInt(data.appId);
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
                images: {
                    create: images?.map((image: any) => ({
                        src: image.src,
                    })),
                },
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('COMMUNITY_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
