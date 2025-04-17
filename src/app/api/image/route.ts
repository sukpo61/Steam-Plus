import { NextResponse } from 'next/server';
import { s3, Bucket, Region } from '@/s3/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req: Request) {
    try {
        const userId = req.headers.get('User-Id');

        const formData = await req.formData();

        console.log(formData, 'formData');

        const files = formData.getAll('img') as File[];

        const file = files[0];
        const arrayBuffer = await file.arrayBuffer();
        const Body = Buffer.from(arrayBuffer);

        const Key = `${userId}/${Date.now()}_${file.name}`;

        await s3.send(
            new PutObjectCommand({
                Bucket,
                Key,
                Body,
                ContentType: file.type || 'image/jpeg',
            }),
        );

        const imageUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`;

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('COMMUNITY_POST', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
