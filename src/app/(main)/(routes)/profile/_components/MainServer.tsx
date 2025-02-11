import { getMain } from '@/actions/main/main';
import { API_MAIN_KEY } from '@/actions/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { MainClient } from './MainClient';

interface MainServerProps {
    searchParams: any;
}

export const MainServer = async ({ searchParams }: MainServerProps) => {
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
