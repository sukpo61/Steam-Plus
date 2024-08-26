import CommunityPageScreen from '@/components/community/CommunityPageScreen';
import { NextPage } from 'next';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ params, searchParams }) => {
    const { page = '1', category = 'all' } = searchParams;
    const mergedParams = { ...searchParams, page, category };
    return <CommunityPageScreen params={params} searchParams={mergedParams} />;
};

export default CommunityPage;
