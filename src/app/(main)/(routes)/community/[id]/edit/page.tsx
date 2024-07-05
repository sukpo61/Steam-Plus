import { NextPage } from 'next';
import CommunityPageScreen from '@components/community/CommunityPageScreen';

interface CommunityPageProps {
    searchParams: {
        page: number;
        category?: string;
    };
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ searchParams }) => {
    const defaultParams = {
        page: 1,
        category: 'all',
    };

    const mergedParams = { ...defaultParams, ...searchParams };

    return <CommunityPageScreen searchParams={mergedParams} />;
};

export default CommunityPage;
