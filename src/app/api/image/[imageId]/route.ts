import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { imageId: string } }) {
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
        });

        return NextResponse.json(image);
    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
