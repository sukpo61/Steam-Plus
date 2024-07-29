import { NextPage } from 'next';
import CommunityAddController from '@components/community/add/CommunityAddController';

interface CommunityAddPageProps {
    params: {
        id: string;
    };
}

const CommunityAddPage: NextPage<CommunityAddPageProps> = async ({ params }) => {
    return <CommunityAddController params={params} />;
};

export default CommunityAddPage;
