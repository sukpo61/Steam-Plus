import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request, props: { params: Promise<{ serverId: string }> }) {
    const params = await props.params;
    try {
        const { serverId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const member = await db.member.create({
            data: {
                userId,
                serverId,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.log('[MEMBER_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
