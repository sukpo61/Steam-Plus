import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(req: Request, props: { params: Promise<{ imageId: string }> }) {
    const params = await props.params;
    try {
        const { imageId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const image = await db.image.delete({
            where: {
                id: imageId,
            },
            include: {
                message: true,
                directMessage: true,
            },
        });

        const { message, directMessage } = image;

        if (message) {
            const { id, content } = message;
            const images = await db.image.count({
                where: {
                    messageId: id,
                },
            });
            if (!content && images === 0) {
                await db.message.delete({
                    where: {
                        id,
                    },
                });
            }
        }

        if (directMessage) {
            const { id, content } = directMessage;
            const images = await db.image.count({
                where: {
                    directMessageId: id,
                },
            });
            if (!content && images === 0) {
                await db.message.delete({
                    where: {
                        id,
                    },
                });
            }
        }

        return NextResponse.json(image);
    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
