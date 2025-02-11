'use client';

import { API_MESSAGE_KEY } from '@/actions/queryKeys';
import { Message } from '@/components/chat/Message';
import { MessageController } from '@/components/chat/MessageController';
import { deleteImage } from '@/actions/image/deleteImage';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/provider/SocketProvider';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

interface MessageListProps {
    data: any;
    params?: any;
    searchParams?: any;
    isDM?: boolean;
}

export const MessageList = ({ data, params, searchParams, isDM }: MessageListProps) => {
    const {
        data: { id: userId },
    } = useUserStore();

    const [editId, setEditId] = useState<string | null>(null);

    const queryCaches = useQueryClient();

    const { socket } = useSocket();

    const deleteMessage = async (id: string) => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        userConfirm && socket.emit(isDM ? 'dmDelete' : 'delete', { id });
    };

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteMessage,
        onSuccess: async () => {
            await queryCaches.invalidateQueries({ queryKey: [API_MESSAGE_KEY, searchParams] });
        },
    });

    const { mutate: deleteImageMutate } = useMutation({
        mutationFn: deleteImage,
        onSuccess: async () => {
            await queryCaches.invalidateQueries({ queryKey: [API_MESSAGE_KEY, searchParams] });
        },
    });

    return (
        <>
            {data.map((page: any) =>
                page.items?.map((item: any) => {
                    const { id, user } = item;
                    const { id: messageUserId } = user || {};
                    return (
                        <MessageController item={item} onClose={() => setEditId(null)} isDM={isDM}>
                            <Message
                                key={id}
                                item={item}
                                isEdit={id === editId}
                                isOwned={userId === messageUserId}
                                isDM={isDM}
                                params={params}
                                setEditId={setEditId}
                                onDelete={deleteMutate}
                                onImageDelete={deleteImageMutate}
                            />
                        </MessageController>
                    );
                }),
            )}
        </>
    );
};
