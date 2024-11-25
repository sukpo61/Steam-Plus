'use client';

import { ServerParams, ServerSearchParams } from 'types/params/server';

import { API_MESSAGE_KEY } from '@/actions/queryKeys';
import ChatController from './ChatController';
import { ChatInput } from '@/components/ui/ChatInput';
import { Message } from './Message';
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
    const addKey = `messages/${serverId}/add`;
    const updateKey = `messages/${serverId}/update`;
    const deleteKey = `messages/${serverId}/delete`;

    useChatSocket({ queryKey: [API_MESSAGE_KEY, searchParams], addKey, updateKey, deleteKey });

    const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
        queryKey: [API_MESSAGE_KEY, searchParams],
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
                    {messagesData.map((page: any) =>
                        page.items?.map((item: any) => (
                            <Message
                                key={item.id}
                                item={item}
                                params={params}
                                searchParams={searchParams}
                            />
                        )),
                    )}
                </ObserverTrigger>
            </div>
            <div className="flex w-full pb-6 pl-4 pr-3">
                <ChatController params={params} searchParams={searchParams}>
                    <ChatInput disabled={isPreview} multiple />
                </ChatController>
            </div>
        </div>
    );
};
