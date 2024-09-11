import { API_GET_USER_INFO_KEY } from '@/actions/queryKeys';
import { getUserInfo } from '@/actions/user/user';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NavbarClient } from './NavbarClient';

export const NavbarServer = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_GET_USER_INFO_KEY],
        queryFn: getUserInfo,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NavbarClient />
        </HydrationBoundary>
    );
};
