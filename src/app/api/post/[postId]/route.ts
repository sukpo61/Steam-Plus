import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function GET(_: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;
        const server = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;

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

export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { images, ...postData } = await req.json();
        const { postId } = params;

        if (images > 5) {
            return new NextResponse('Image upload exceeded', { status: 401 });
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

        const currentImageIds = currentImages.map((img) => img.id);

        const newImageIds = images.map((img: any) => img.id).filter(Boolean);

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

        const server = await db.post.findUnique({
            where: { id: postId },
            include: { images: true },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error('CHANNELS_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
