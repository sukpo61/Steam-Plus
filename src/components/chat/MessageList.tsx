'use client';

import { Message } from './Message';
import { useSocket } from '@/provider/SocketProvider';
import { useUserStore } from '@/store/useUserStore';

interface MessageListProps {
    data: any;
    params: any;
    isDM?: boolean;
}

export const MessageList = ({ data, params, isDM }: MessageListProps) => {
    const {
        data: { id: userId },
    } = useUserStore();

    const { socket } = useSocket();

    const deleteHandler = (id: any) => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirm) socket.emit(isDM ? 'dmDelete' : 'delete', { id });
    };

    return (
        <>
            {data.map((page: any) =>
                page.items?.map((item: any) => {
                    const { id, user } = item;
                    const { id: messageUserId } = user || {};
                    return (
                        <Message
                            key={id}
                            item={item}
                            isOwned={userId === messageUserId}
                            isDM={isDM}
                            params={params}
                            onDelete={() => deleteHandler(id)}
                        />
                    );
                }),
            )}
        </>
    );
};
