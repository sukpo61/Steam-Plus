import { NextPage } from 'next';
import CommunityPageScreen from '@components/community/CommunityPageScreen';
import { CommunitySearchParams } from 'types/searchParams/community';

interface CommunityPageProps {
    searchParams: CommunitySearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ searchParams }) => {
    const { page = '1', category = 'all' } = searchParams;
    const mergedParams = { ...searchParams, page, category };
    return <CommunityPageScreen searchParams={mergedParams} />;
};

export default CommunityPage;
