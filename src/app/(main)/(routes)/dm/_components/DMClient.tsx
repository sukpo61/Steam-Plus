'use client';

import { DMParams, DMSearchParams } from 'types/params/dm';

import { API_DM_KEY } from '@/actions/queryKeys';
import ChatController from '@/components/chat/ChatController';
import { ChatInput } from '@/components/ui/ChatInput';
import { Message } from '@/components/chat/Message';
import { MessageList } from '@/components/chat/MessageList';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import { ServerHeader } from '@/components/chat/ServerHeader';
import { User } from './User';
import { getDMMessages } from '@/actions/dm/messages';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useEffect } from 'react';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface ServerProps {
    params: DMParams;
    searchParams: DMSearchParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const DMClient = ({ params, searchParams }: ServerProps) => {
    const { setType } = useSidebarStore();

    const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
        queryKey: [API_DM_KEY, params],
        queryFn: ({ pageParam: cursor }) => getDMMessages({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const conversationId = data.pages[0].conversationId;
    const addKey = `messages/${conversationId}/add`;
    const updateKey = `messages/${conversationId}/update`;
    const deleteKey = `messages/${conversationId}/delete`;

    useChatSocket({ queryKey: [API_DM_KEY, params], addKey, updateKey, deleteKey });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const messagesData = data.pages;

    useEffect(() => {
        setType('friend');
    }, []);

    return (
        <div className="flex h-full w-full flex-col">
            <ServerHeader data={{}} />
            <div className="flex flex-1">
                <div className="flex h-full w-full flex-col pr-1 pt-1">
                    <div className="thumb-bg thumb-lg flex w-full flex-1 basis-0 flex-col-reverse overflow-y-scroll px-4">
                        <ObserverTrigger onObserve={onObserve}>
                            <MessageList data={messagesData} params={params} isDM />
                        </ObserverTrigger>
                    </div>
                    <div className="flex w-full pb-6 pl-4 pr-3">
                        <ChatController params={params}>
                            <ChatInput multiple className="bg-primary" />
                        </ChatController>
                    </div>
                </div>
                <div className="flex h-full w-[240px] flex-col gap-2 px-2 pt-4">
                    <User />
                </div>
            </div>
        </div>
    );
};
