import PostPageScreen from '@/components/community/post/PostPageScreen';
import { NextPage } from 'next';
import { PostParams, PostSearchParams } from 'types/params/community';

interface PostPageProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const PostPage: NextPage<PostPageProps> = async ({ searchParams, params }) => {
    const { page = '1' } = searchParams;
    const mergedParams = { ...searchParams, page };
    return <PostPageScreen searchParams={mergedParams} params={params} />;
};

export default PostPage;
