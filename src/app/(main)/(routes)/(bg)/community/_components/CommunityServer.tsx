import { getCommunity } from '@/actions/community/community';
import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import { CommunityClient } from './CommunityClient';

interface CommunityServerProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const CommunityServer = async ({ params, searchParams }: CommunityServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_COMMUNITY_KEY, params, searchParams],
        queryFn: () => getCommunity({ params, searchParams }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CommunityClient params={params} searchParams={searchParams} />
        </HydrationBoundary>
    );
};
