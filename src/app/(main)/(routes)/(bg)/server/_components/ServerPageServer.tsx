import { API_MESSAGE_KEY, API_SERVER_KEY } from '@/actions/queryKeys';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { ServerParams, ServerSearchParams } from 'types/params/server';

import { ServerClient } from './ServerClient';
import { getMessages } from '@/actions/messages/messages';
import { getServer } from '@/actions/server/server';

interface ServerPageProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
}

export const ServerPageServer = async ({ params, searchParams }: ServerPageProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_SERVER_KEY, params],
        queryFn: () => getServer({ params }),
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: [API_MESSAGE_KEY, searchParams],
        queryFn: ({ pageParam: cursor }) => getMessages({ searchParams, cursor }),
        initialPageParam: null,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ServerClient params={params} searchParams={searchParams} />
        </HydrationBoundary>
    );
};
