import { FriendParams, FriendSearchParams } from 'types/params/friend';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_FRIEND_KEY } from '@/actions/queryKeys';
import { FriendClient } from './FriendClient';
import { getFriends } from '@/actions/friend/friend';

interface FriendServerProps {
    params: FriendParams;
    searchParams: FriendSearchParams;
}

export const FriendServer = async ({ params, searchParams }: FriendServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_FRIEND_KEY, searchParams],
        queryFn: () => getFriends({ searchParams }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FriendClient params={params} searchParams={searchParams} />
        </HydrationBoundary>
    );
};
