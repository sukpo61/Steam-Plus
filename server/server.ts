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

        socket.on('message', async ({ content, channelId, serverId, images }) => {
            try {
                const member = await db.member.findFirst({
                    where: {
                        serverId: serverId,
                        userId: userId,
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

                const message = await db.message.create({
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

                io.emit(addKey, { message, channelId });
            } catch (error) {
                console.error('MESSAGE_POST', error);
            }
        });

        socket.on('edit', async ({ id, content }) => {
            try {
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
