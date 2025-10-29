import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_MAIN_KEY } from '@/actions/queryKeys';
import { MainClient } from './MainClient';
import { getCommunity } from '@/actions/community/community';
import { getMain } from '@/actions/main/main';

interface MainServerProps {}

export const MainServer = async ({}: MainServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_MAIN_KEY],
        queryFn: () => getMain(),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MainClient />
        </HydrationBoundary>
    );
};
