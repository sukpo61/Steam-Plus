'use client';

import { io as ClientIO, Socket as InitSocket } from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';

import api from '@/lib/api';
import axios from 'axios';
import { getCookie } from '@/lib/cookies';

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

interface Socket extends InitSocket {
    auth: {
        token?: string;
    };
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    const getAccessToken = async () => {
        try {
            const refreshToken = await getCookie('refreshToken');
            if (refreshToken) {
                const response = await axios.get('/api/auth/renew-token', {
                    headers: {
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });
                const newAccessToken = response.headers['authorization'];
                return `Bearer ${newAccessToken}`;
            }
        } catch (error) {
            console.error('Failed to fetch access token:', error);
        }
    };

    useEffect(() => {
        const initializeSocket = async () => {
            let accessToken = api.defaults.headers.common['Authorization'];

            if (!accessToken) {
                accessToken = await getAccessToken();
            }

            if (accessToken) {
                const socketInstance = ClientIO('/', {
                    auth: { token: accessToken },
                }) as Socket;

                socketInstance.on('connect', () => {
                    setIsConnected(true);
                });

                socketInstance.on('disconnect', () => {
                    setIsConnected(false);
                });

                socketInstance.on('connect_error', async (err: Error) => {
                    console.log('socket error', err.message);
                    if (err.message === 'Token has expired') {
                        socketInstance.auth.token = await getAccessToken();
                        socketInstance.connect();
                    }
                });

                setSocket(socketInstance);

                return () => {
                    socketInstance.disconnect();
                };
            }
        };

        initializeSocket();
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
    );
};
