import { NextPage } from 'next';
import PostPageScreen from '@/components/community/post/PostPageScreen';
import { PostParams } from 'types/params/community';
import { PostSearchParams } from 'types/params/community';

interface CommunityPageProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const CommunityPage: NextPage<CommunityPageProps> = async ({ searchParams, params }) => {
    const { page = '1' } = searchParams;
    const mergedParams = { ...searchParams, page };
    return <PostPageScreen searchParams={mergedParams} params={params} />;
};

export default CommunityPage;
