import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function DELETE(req: Request, props: { params: Promise<{ memberId: string }> }) {
    const params = await props.params;
    try {
        const { memberId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const member = await db.member.delete({
            where: {
                id: memberId,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.log('[MEMBER_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
