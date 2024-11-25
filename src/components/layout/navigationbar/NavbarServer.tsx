import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_USER_KEY } from '@/actions/queryKeys';
import { NavbarClient } from './NavbarClient';
import { getUserInfo } from '@/actions/user/user';

export const NavbarServer = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_USER_KEY],
        queryFn: getUserInfo,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NavbarClient />
        </HydrationBoundary>
    );
};
