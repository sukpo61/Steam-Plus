import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';

export async function POST(req: Request, { params }: { params: { serverId: string } }) {
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
export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const { serverId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const member = await db.member.delete({
            where: {
                userId_serverId: {
                    userId,
                    serverId,
                },
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.log('[MEMBER_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
