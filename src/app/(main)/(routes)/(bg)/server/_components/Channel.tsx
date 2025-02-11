'use client';

import { ServerParams, ServerSearchParams } from 'types/params/server';

import { API_MESSAGE_KEY } from '@/actions/queryKeys';
import { ChatController } from '@/components/chat/ChatController';
import { ChatInput } from '@/components/chat/ChatInput';
import { MessageList } from '@/components/chat/MessageList';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import { getMessages } from '@/actions/messages/messages';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface ChannelProps {
    data?: any;
    params: ServerParams;
    searchParams: ServerSearchParams;
    isPreview: boolean;
}

export const Channel = ({ params, searchParams, isPreview }: ChannelProps) => {
    const { serverId } = params;
    const queryKey = [API_MESSAGE_KEY, searchParams];
    const addKey = `messages/${serverId}/add`;
    const updateKey = `messages/${serverId}/update`;
    const deleteKey = `messages/${serverId}/delete`;

    useChatSocket({ queryKey, addKey, updateKey, deleteKey });

    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: cursor }) => getMessages({ searchParams, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const messagesData = data.pages;

    return (
        <div className="flex h-full w-full flex-col pr-1 pt-1">
            <div className="thumb-bg thumb-lg flex w-full flex-1 basis-0 flex-col-reverse overflow-y-scroll px-4">
                <ObserverTrigger onObserve={onObserve}>
                    <MessageList data={messagesData} params={params} searchParams={searchParams} />
                </ObserverTrigger>
            </div>
            <div className="flex w-full pb-6 pl-4 pr-3">
                <ChatController params={searchParams}>
                    <ChatInput disabled={isPreview} multiple />
                </ChatController>
            </div>
        </div>
    );
};
