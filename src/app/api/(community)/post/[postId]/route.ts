import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { getAppDetails } from '@/app/api/actions/steam';
4;
const IMAGE_UPLOAD_LIMIT = 5;

export async function GET(req: Request, props: { params: Promise<{ postId: string }> }) {
    const params = await props.params;
    try {
        const { postId } = params;
        const userId = req.headers.get('User-Id');

        await db.post.update({
            where: {
                id: postId,
            },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                images: true,
                user: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        const appId = post?.appId;

        let appInfo;

        if (appId) {
            const { name, header_image } = await getAppDetails(appId);
            appInfo = { name, header_image };
        }

        const isOwned = userId && userId === post?.userId;

        return NextResponse.json({ ...post, isOwned, appInfo });
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ postId: string }> }) {
    const params = await props.params;
    try {
        const { postId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            select: { userId: true },
        });

        if (userId !== post?.userId) {
            return new NextResponse('Invalid UserId', { status: 401 });
        }

        await db.comment.updateMany({
            where: {
                OR: [{ postId: postId }, { parentId: { not: null } }],
            },
            data: { parentId: null },
        });

        const server = await db.post.delete({
            where: { id: postId },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ postId: string }> }) {
    const params = await props.params;
    try {
        const { images, ...postData } = await req.json();
        const { postId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const postRecord = await db.post.findUnique({
            where: {
                id: postId,
            },
            select: { userId: true },
        });

        if (userId !== postRecord?.userId) {
            return new NextResponse('Invalid user', { status: 401 });
        }

        if (images.length > IMAGE_UPLOAD_LIMIT) {
            return new NextResponse('Image upload exceeded', { status: 403 });
        }

        await db.post.update({
            where: {
                id: postId,
            },
            data: postData,
        });

        const currentImages = await db.image.findMany({
            where: { postId: postId },
            select: { id: true },
        });

        const currentImageIds = currentImages?.map((img) => img.id);

        const newImageIds = images?.map((img: any) => img.id).filter(Boolean);

        const imagesToDelete = currentImageIds.filter((id) => !newImageIds.includes(id));

        if (imagesToDelete.length > 0) {
            await db.image.deleteMany({
                where: {
                    id: { in: imagesToDelete },
                },
            });
        }

        if (images && images.length > 0) {
            await Promise.all(
                images.map(async (image: any) => {
                    if (!image.postId) {
                        await db.image.create({
                            data: {
                                src: image.src,
                                postId: postId,
                            },
                        });
                    }
                }),
            );
        }

        const post = await db.post.findUnique({
            where: { id: postId },
            include: { images: true },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
