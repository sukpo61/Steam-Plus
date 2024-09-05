import { getCommunity } from '@/actions/community/community';
import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import CommunityPageController from '@/app/(main)/(routes)/community/_components/CommunityPageController';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ params, searchParams }) => {
    const queryClient = new QueryClient();

    const { page = '1', category = 'all', order = 'popular' } = searchParams;
    const defaultParams = { ...searchParams, page, category, order };

    await queryClient.prefetchQuery({
        queryKey: [API_COMMUNITY_KEY, params, defaultParams],
        queryFn: () => getCommunity({ params, searchParams: defaultParams }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CommunityPageController params={params} searchParams={defaultParams} />
        </HydrationBoundary>
    );
};

export default CommunityPage;
