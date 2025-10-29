import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, props: { params: Promise<{ serverId: string }> }) {
    const params = await props.params;
    try {
        const { serverId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.findUnique({
            where: { id: serverId },
            select: {
                id: true,
                name: true,
                description: true,
                app: {
                    select: {
                        name: true,
                        steam_appid: true,
                        background: true,
                        header_image: true,
                    },
                },
                channels: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        isDefault: true,
                    },
                    orderBy: { createdAt: 'asc' },
                },
                members: {
                    select: {
                        id: true,
                        role: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        const currentMember = server?.members.find((member) => member.user.id === userId);

        const friendsRecord = await db.friendship.findMany({
            where: {
                status: 'ACCEPTED',
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            include: {
                sender: { select: { id: true } },
                receiver: { select: { id: true } },
            },
        });

        const friendsId = friendsRecord.map((item) => {
            const isSender = item.senderId === userId;
            return isSender ? item.receiverId : item.senderId;
        });

        const serverResult = {
            ...server,
            memberId: currentMember?.id || null,
            role: currentMember?.role || null,
            members: server?.members.map(
                ({ id, role, user: { id: memberUserId, name, avatar } }) => ({
                    id,
                    userId: memberUserId,
                    role,
                    isFriend: friendsId.includes(memberUserId) || memberUserId === userId,
                    name,
                    avatar,
                }),
            ),
        };

        return NextResponse.json(serverResult);
    } catch (error) {
        console.log('[SERVER_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ serverId: string }> }) {
    const params = await props.params;
    try {
        const { serverId } = params;
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.delete({
            where: {
                id: serverId,
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ serverId: string }> }) {
    const params = await props.params;
    try {
        const data = await req.json();
        const { serverId } = params;

        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                userId,
            },
            data,
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVER_ID_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
