import { getApp } from '@/actions/channel/channel';
import { API_APP_KEY } from '@/actions/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AppParams } from 'types/params/app';
import { AppClient } from './AppClient';

interface AppServerProps {
    params: AppParams;
}

export const AppServer = async ({ params }: AppServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_APP_KEY, params],
        queryFn: () => getApp({ params }),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AppClient params={params} />
        </HydrationBoundary>
    );
};
