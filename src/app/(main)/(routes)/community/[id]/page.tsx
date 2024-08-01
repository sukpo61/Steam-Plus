import { NextPage } from 'next';
import CommunityDetailPageScreen from '@components/community/detail/CommunityDetailPageScreen';
import { CommunityDetailRequestParams } from 'types/params/community';

const CommunityPage: NextPage<CommunityDetailRequestParams> = async ({ searchParams, params }) => {
    const { page = '1' } = searchParams;
    const mergedParams = { ...searchParams, page };
    return <CommunityDetailPageScreen searchParams={mergedParams} params={params} />;
};

export default CommunityPage;
