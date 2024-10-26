import 'tsconfig-paths/register';

import * as jose from 'jose';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { db } from '@/lib/db';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('connection');

        socket.on('message', async ({ content, channelId, serverId }) => {
            const accessToken = socket.handshake.auth.token?.split(' ')[1];

            if (!accessToken) {
                console.error('No Authorization token found in cookies');
                return;
            }

            try {
                // JWT 검증
                const decodedToken = (await jose.jwtVerify(accessToken, jwtConfig.secret)) as {
                    payload: { userId: string };
                };
                const { userId } = decodedToken.payload;

                console.log(`Decoded user ID: ${userId}`);

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

                // 메시지 생성
                const message = await db.message.create({
                    data: {
                        content,
                        channelId: channelId as string,
                        memberId: memberId,
                    },
                    include: {
                        member: {
                            include: {
                                user: true,
                            },
                        },
                    },
                });

                const addKey = `messages/${serverId}/add`;
                // 소켓을 통해 메시지 전송
                io.emit(addKey, { message, channelId });
            } catch (error) {
                console.error('Invalid token:', error);
            }
        });

        socket.on('edit', async ({ id, content }: any) => {
            const accessToken = socket.handshake.auth.token?.split(' ')[1];

            if (!accessToken) {
                console.error('No Authorization token found in cookies');
                return;
            }

            try {
                // JWT 검증
                const decodedToken = (await jose.jwtVerify(accessToken, jwtConfig.secret)) as {
                    payload: { userId: string };
                };
                const { userId } = decodedToken.payload;

                console.log(`Decoded user ID: ${userId}`);

                // 메시지 생성
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
                console.error('Invalid token:', error);
            }
        });
        socket.on('delete', async ({ id }: any) => {
            const accessToken = socket.handshake.auth.token?.split(' ')[1];

            if (!accessToken) {
                console.error('No Authorization token found in cookies');
                return;
            }

            try {
                // JWT 검증
                const decodedToken = (await jose.jwtVerify(accessToken, jwtConfig.secret)) as {
                    payload: { userId: string };
                };
                const { userId } = decodedToken.payload;

                console.log(`Decoded user ID: ${userId}`);

                // 메시지 생성
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
                console.error('Invalid token:', error);
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
