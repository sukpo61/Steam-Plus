'use client';

import { FriendParams, FriendSearchParams } from 'types/params/friend';
import { acceptRequest, cancleRequest, deleteFriend, getFriends } from '@/actions/friend/friend';

import { API_FRIEND_KEY } from '@/actions/queryKeys';
import { Friend } from './Friend';
import { FriendHeader } from './FriendHeader';
import { SearchInput } from '@/components/common/SearchInput';
import { Separator } from '@/components/ui/Separator';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSuspenseQuery } from '@tanstack/react-query';

interface FriendProps {
    params: FriendParams;
    searchParams: FriendSearchParams;
}

export const FriendClient = ({ params, searchParams }: FriendProps) => {
    const { setType } = useSidebarStore();
    const queryCaches = useQueryClient();

    const { data, refetch, isPending } = useSuspenseQuery({
        queryKey: [API_FRIEND_KEY, searchParams],
        queryFn: () => getFriends({ searchParams }),
        staleTime: 0,
    });

    const onSuccess = async () => {
        await queryCaches.invalidateQueries({ queryKey: [API_FRIEND_KEY] });
    };

    const { mutate: acceptMutate } = useMutation({
        mutationFn: acceptRequest,
        onSuccess,
    });

    const { mutate: cancleMutate } = useMutation({
        mutationFn: cancleRequest,
        onSuccess,
    });

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteFriend,
        onSuccess,
    });

    useEffect(() => {
        setType('friend');
    }, []);

    return (
        <div className="flex h-full w-full flex-col">
            <FriendHeader data={{}} />
            <Separator className="bg-primary-dark" />
            <div className="flex flex-1">
                <div className="flex flex-1 flex-col px-8 py-4">
                    <SearchInput placeholder="검색하기" />
                    <div className="flex py-4">
                        <span className="text-sm">{`대기중 - ${data?.length}명`}</span>
                    </div>
                    {data?.map((friend) => {
                        const { id } = friend;
                        return (
                            <Friend
                                data={friend}
                                onAccept={() => acceptMutate({ params: { requestId: id } })}
                                onCancle={() => cancleMutate({ params: { requestId: id } })}
                            />
                        );
                    })}
                </div>
                <Separator orientation="vertical" className="bg-primary-brighter" />
                <div className="flex h-full w-[320px] flex-col gap-2 px-2 pt-4"></div>
            </div>
        </div>
    );
};
