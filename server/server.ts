import 'tsconfig-paths/register';

import { Socket as InitSocket, Server } from 'socket.io';

import { createServer } from 'node:http';
import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

interface Socket extends InitSocket {
    user?: { userId: string };
}

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.use(async (socket: Socket, next: (err?: Error) => void) => {
        try {
            const authHeader = socket.handshake.auth.token;
            if (!authHeader) {
                console.error('No Authorization header provided');
                return next(new Error('Authorization header is missing'));
            }

            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                console.error('Invalid Authorization header format');
                return next(new Error('Invalid Authorization header format'));
            }

            const accessToken = parts[1];

            if (!accessToken) {
                console.error('Token is missing after Bearer');
                return next(new Error('Token is missing'));
            }

            try {
                const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as any;

                const { userId } = decodedToken;
                if (!userId) {
                    console.error('Invalid token payload: userId is missing');
                    return next(new Error('Invalid token payload'));
                }

                socket.user = { userId };
            } catch (err: any) {
                if (err.name === 'TokenExpiredError') {
                    console.error('Token has expired');
                    return next(new Error('Token has expired'));
                }
                console.error('Unexpected error during token verification:', err);
                return next(new Error('Unexpected token verification error'));
            }

            next();
        } catch (err) {
            console.error('Unexpected error in authentication middleware:', err);
            next(new Error('Unexpected authentication error'));
        }
    });

    io.on('connection', (socket: Socket) => {
        const { userId } = socket.user || {};

        if (!userId) {
            console.error('userId is missing');
            return;
        }

        socket.on('message', async ({ content, channelId, images }) => {
            console.log('userId', userId);

            try {
                const channel = await db.channel.findUnique({
                    where: {
                        id: channelId,
                    },
                    select: {
                        serverId: true,
                    },
                });

                const serverId = channel?.serverId;

                const member = await db.member.findFirst({
                    where: {
                        serverId,
                        userId,
                    },
                    select: {
                        id: true,
                    },
                });

                const memberId = member?.id;

                if (!memberId) {
                    console.error('No Member');
                    return;
                }

                const messageRecord = await db.message.create({
                    data: {
                        content,
                        channelId: channelId as string,
                        memberId: memberId,
                        images: {
                            create: images?.map((image: any) => ({
                                src: image.src,
                            })),
                        },
                    },
                    include: {
                        member: {
                            include: {
                                user: true,
                            },
                        },
                        images: true,
                    },
                });

                const addKey = `messages/${serverId}/add`;

                const message = {
                    ...messageRecord,
                    user: messageRecord.member.user,
                } as any;

                delete message.member;

                io.emit(addKey, { message });
            } catch (error) {
                console.error('MESSAGE_POST', error);
            }
        });

        socket.on('edit', async ({ id, content, images }) => {
            try {
                const messageRecord = await db.message.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        member: {
                            select: {
                                userId: true,
                            },
                        },
                    },
                });

                if (userId !== messageRecord?.member.userId) {
                    console.error(`Unauthorized attempt to edit message by userId: ${userId}`);
                    return;
                }

                const currentImages = await db.image.findMany({
                    where: { messageId: id },
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
                            if (!image.messageId) {
                                await db.image.create({
                                    data: {
                                        src: image.src,
                                        messageId: id,
                                    },
                                });
                            }
                        }),
                    );
                }

                const message = await db.message.update({
                    where: {
                        id,
                    },
                    data: {
                        content,
                    },
                    include: {
                        channel: {
                            select: {
                                serverId: true,
                            },
                        },
                        images: true,
                        member: {
                            include: {
                                user: true,
                            },
                        },
                    },
                });

                const serverId = message.channel.serverId;
                const updateKey = `messages/${serverId}/update`;

                io.emit(updateKey, { message });
            } catch (error) {
                console.error('MESSAGE_EDIT', error);
            }
        });

        socket.on('delete', async ({ id }) => {
            try {
                const message = await db.message.delete({
                    where: {
                        id,
                    },
                    include: {
                        channel: {
                            select: {
                                serverId: true,
                            },
                        },
                    },
                });

                const serverId = message.channel.serverId;

                const deleteKey = `messages/${serverId}/delete`;

                io.emit(deleteKey, { id });
            } catch (error) {
                console.error('MESSAGE_DELETE', error);
            }
        });

        socket.on('dmMessage', async ({ userId: dmUserId, content, images }) => {
            try {
                const conversation = await db.conversation.findFirst({
                    where: {
                        OR: [
                            { userOneId: userId, userTwoId: dmUserId },
                            { userOneId: dmUserId, userTwoId: userId },
                        ],
                    },
                });

                const conversationId = conversation?.id;

                if (!conversationId) {
                    console.error('No conversation');
                    return;
                }

                const message = await db.directMessage.create({
                    data: {
                        content,
                        conversationId,
                        userId,
                        images: {
                            create: images?.map((image: any) => ({
                                src: image.src,
                            })),
                        },
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                        images: true,
                    },
                });

                const addKey = `messages/${conversationId}/add`;

                io.emit(addKey, { message });
            } catch (error) {
                console.error('DMMESSAGE_POST', error);
            }
        });

        socket.on('dmEdit', async ({ id, content, images }) => {
            try {
                const messageRecord = await db.directMessage.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        userId: true,
                    },
                });

                if (userId !== messageRecord?.userId) {
                    console.error(`Unauthorized attempt to edit DM by userId: ${userId}`);
                    return;
                }

                const currentImages = await db.image.findMany({
                    where: { directMessageId: id },
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
                            if (!image.directMessageId) {
                                await db.image.create({
                                    data: {
                                        src: image.src,
                                        directMessageId: id,
                                    },
                                });
                            }
                        }),
                    );
                }

                const message = await db.directMessage.update({
                    where: {
                        id,
                    },
                    data: {
                        content,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                        images: true,
                    },
                });

                const conversationId = message?.conversationId;

                const updateKey = `messages/${conversationId}/update`;

                io.emit(updateKey, { message });
            } catch (error) {
                console.error('DMMESSAGE_EDIT', error);
            }
        });

        socket.on('dmDelete', async ({ id }) => {
            try {
                const message = await db.directMessage.delete({
                    where: {
                        id,
                    },
                });

                const conversationId = message?.conversationId;

                const deleteKey = `messages/${conversationId}/delete`;

                io.emit(deleteKey, { id });
            } catch (error) {
                console.error('DMMESSAGE_DELETE', error);
            }
        });
    });

    httpServer
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
