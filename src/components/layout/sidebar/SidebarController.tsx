import { API_GET_USER_INFO_KEY } from '@/actions/queryKeys';
import getUserInfo from '@/actions/user/user';
import SidebarScreen from '@/components/layout/sidebar/SidebarScreen';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const SidebarController = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_GET_USER_INFO_KEY],
        queryFn: getUserInfo,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarScreen />
        </HydrationBoundary>
    );
};

export default SidebarController;
