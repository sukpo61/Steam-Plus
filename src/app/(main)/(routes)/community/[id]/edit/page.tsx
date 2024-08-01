import { NextPage } from 'next';
import CommunityAddController from '@components/community/add/CommunityAddController';
import { CommunityDetailParams } from 'types/params/community';

const CommunityAddPage: NextPage<CommunityDetailParams> = async ({ params }) => {
    return <CommunityAddController params={params} />;
};

export default CommunityAddPage;
