import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { ServerParams, ServerSearchParams } from 'types/params/server';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { ServerClient } from './ServerClient';
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

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ServerClient params={params} searchParams={searchParams} />
        </HydrationBoundary>
    );
};
