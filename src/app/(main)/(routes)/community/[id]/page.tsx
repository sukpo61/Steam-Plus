import { NextPage } from 'next';
import CommunityDetailPageScreen from '@components/community/detail/CommunityDetailPageScreen';
import { CommunitySearchParams } from 'types/searchParams/community';

interface CommunityPageProps {
    params: {
        id: string;
    };
    searchParams: CommunitySearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ searchParams, params }) => {
    const { page = '1' } = searchParams;
    const mergedParams = { ...searchParams, page };
    return <CommunityDetailPageScreen searchParams={mergedParams} params={params} />;
};

export default CommunityPage;
