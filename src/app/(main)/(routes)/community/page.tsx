import { NextPage } from 'next';
import CommunityPageScreen from '@components/community/CommunityPageScreen';
import { CommunitySearchParams } from 'types/params/community';

const CommunityPage: NextPage<CommunitySearchParams> = async ({ searchParams }) => {
    const { page = '1', category = 'all' } = searchParams;
    const mergedParams = { ...searchParams, page, category };
    return <CommunityPageScreen searchParams={mergedParams} />;
};

export default CommunityPage;
