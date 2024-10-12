import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { SidebarClient } from './SidebarClient';

export const SidebarServer = async () => {
    const queryClient = new QueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarClient />
        </HydrationBoundary>
    );
};
