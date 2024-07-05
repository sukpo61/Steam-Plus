import { NextPage } from 'next';
import CommunityAddPageScreen from '@components/community/add/CommunityAddPageScreen';

interface CommunityAddPageProps {
    searchParams: {
        page: number;
        category?: string;
    };
}

const CommunityAddPage: NextPage<CommunityAddPageProps> = async ({ searchParams }) => {
    return <CommunityAddPageScreen searchParams={searchParams} />;
};

export default CommunityAddPage;
