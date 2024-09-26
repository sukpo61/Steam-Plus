import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_APP_KEY } from '@/actions/queryKeys';
import { AppClient } from './AppClient';
import { AppParams } from 'types/params/app';
import { getApp } from '@/actions/app/app';

interface AppServerProps {
    params: AppParams;
}

export const AppServer = async ({ params }: AppServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [API_APP_KEY, params],
        queryFn: ({ pageParam: cursor }) => getApp({ params, cursor }),
        initialPageParam: null,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AppClient params={params} />
        </HydrationBoundary>
    );
};
