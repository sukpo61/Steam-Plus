import { DMParams, DMSearchParams } from 'types/params/dm';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_DM_KEY } from '@/actions/queryKeys';
import { DMClient } from './DMClient';
import { getDMMessages } from '@/actions/dm/messages';

interface ServerPageProps {
    params: DMParams;
    searchParams: DMSearchParams;
}

export const DMServer = async ({ params, searchParams }: ServerPageProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [API_DM_KEY, params],
        queryFn: ({ pageParam: cursor }) => getDMMessages({ params, cursor }),
        initialPageParam: null,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DMClient params={params} searchParams={searchParams} />
        </HydrationBoundary>
    );
};
