import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import { CommunityClient } from './CommunityClient';
import { getCommunity } from '@/actions/community/community';
import { getMain } from '@/actions/main/main';

interface CommunityServerProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const CommunityServer = async ({ params, searchParams }: CommunityServerProps) => {
    const queryClient = new QueryClient();
    const queryKey = [API_COMMUNITY_KEY, params, searchParams];

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getCommunity({ params, searchParams }),
    });

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CommunityClient params={params} searchParams={searchParams} />
            </HydrationBoundary>
        </>
    );
};
