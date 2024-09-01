import { getCommunity } from '@/actions/community/community';
import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import CommunityPageScreen from '@/components/community/CommunityPageScreen';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ params, searchParams }) => {
    const queryClient = new QueryClient();

    const { page = '1', category = 'all' } = searchParams;
    const mergedParams = { ...searchParams, page, category };

    await queryClient.prefetchQuery({
        queryKey: [API_COMMUNITY_KEY, params, mergedParams],
        queryFn: () => getCommunity({ params, searchParams: mergedParams }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CommunityPageScreen params={params} searchParams={mergedParams} />
        </HydrationBoundary>
    );
};

export default CommunityPage;
