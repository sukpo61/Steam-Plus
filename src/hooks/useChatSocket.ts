import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/provider/SocketProvider';

interface useChatSocketParams {
    queryKey: any[];
    addKey: string;
    updateKey: string;
    deleteKey: string;
}

export const useChatSocket = ({ queryKey, addKey, updateKey, deleteKey }: useChatSocketParams) => {
    const { socket } = useSocket();
    const queryCaches = useQueryClient();

    useEffect(() => {
        const addMessage = async ({ message }: any) => {
            await queryCaches.setQueryData(queryKey, (prevData: any) => {
                if (!prevData || !prevData.pages || prevData.pages.length === 0) {
                    return prevData;
                }

                const newData = prevData.pages.map((page: any, index: number) => {
                    if (index === 0) {
                        return {
                            ...page,
                            items: [message, ...page.items],
                        };
                    }
                    return page;
                });

                return {
                    ...prevData,
                    pages: newData,
                };
            });
        };
        const updateMessage = async ({ message }: any) => {
            await queryCaches.setQueryData(queryKey, (prevData: any) => {
                if (!prevData || !prevData.pages || prevData.pages.length === 0) {
                    return prevData;
                }

                const newData = prevData.pages.map((page: any, index: number) => ({
                    ...page,
                    items: page.items.map((item: any) => {
                        if (item.id === message.id) {
                            return { ...item, ...message };
                        }
                        return item;
                    }),
                }));

                return {
                    ...prevData,
                    pages: newData,
                };
            });
        };

        const deleteMessage = async ({ id }: any) => {
            await queryCaches.setQueryData(queryKey, (prevData: any) => {
                if (!prevData || !prevData.pages || prevData.pages.length === 0) {
                    return prevData;
                }

                const newData = prevData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.filter((item: any) => item.id !== id),
                }));

                return {
                    ...prevData,
                    pages: newData,
                };
            });
        };

        socket?.once(addKey, addMessage);
        socket?.once(updateKey, updateMessage);
        socket?.once(deleteKey, deleteMessage);

        return () => {
            socket?.off(addKey, addMessage);
            socket?.off(updateKey, updateMessage);
            socket?.off(deleteKey, deleteMessage);
        };
    }, [addKey, queryKey, queryCaches, socket]);
};
