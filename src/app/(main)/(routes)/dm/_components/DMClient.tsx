'use client';

import { DMParams, DMSearchParams } from 'types/params/dm';
import { cancleRequest, postFriend } from '@/actions/friend/friend';

import { API_DM_KEY } from '@/actions/queryKeys';
import { ChatController } from '@/components/chat/ChatController';
import { ChatInput } from '@/components/chat/ChatInput';
import { MessageList } from '@/components/chat/MessageList';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import { ServerHeader } from '@/components/chat/ServerHeader';
import { User } from './User';
import { getDMMessages } from '@/actions/dm/messages';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
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

export const DMClient = ({ params }: ServerProps) => {
    const { setType } = useSidebarStore();
    const queryCaches = useQueryClient();
    const queryKey = [API_DM_KEY, params];

    const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: cursor }) => getDMMessages({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const conversationId = data.pages[0].conversationId;
    const messagesData = data.pages;
    const user = data.pages[0].user;
    const addKey = `messages/${conversationId}/add`;
    const updateKey = `messages/${conversationId}/update`;
    const deleteKey = `messages/${conversationId}/delete`;

    useChatSocket({ queryKey, addKey, updateKey, deleteKey });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const onSuccess = async () => {
        await queryCaches.invalidateQueries({ queryKey });
    };

    const { mutate: postFriendMutate } = useMutation({
        mutationFn: postFriend,
        onSuccess,
    });

    const { mutate: cancleMutate } = useMutation({
        mutationFn: cancleRequest,
        onSuccess,
    });

    useEffect(() => {
        setType('friend');
    }, [setType]);

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
                <div className="flex h-full w-[320px] flex-col">
                    <User
                        data={user}
                        postFriend={() => postFriendMutate({ params: { friendId: user.id } })}
                        deleteFriend={() =>
                            cancleMutate({ params: { requestId: user.friendShipId } })
                        }
                    />
                </div>
            </div>
        </div>
    );
};
