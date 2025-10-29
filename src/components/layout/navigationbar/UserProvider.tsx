import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_USER_KEY } from '@/actions/queryKeys';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { UserProviderClient } from './UserProviderClient';
import { getUserInfo } from '@/actions/user/user';

export const UserProvider = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_USER_KEY],
        queryFn: () => getUserInfo(),
    });

    return (
        <>
            <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <UserProviderClient />
                </HydrationBoundary>
            </QuerySuspenseErrorBoundary>
        </>
    );
};
