import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { SidebarClient } from './SidebarClient';

const SidebarLoading = () => {
    return <></>;
};

export const SidebarServer = async () => {
    const queryClient = new QueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarClient />
        </HydrationBoundary>
    );
};
