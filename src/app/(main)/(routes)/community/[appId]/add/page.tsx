import { getPost } from '@/actions/community/post';
import { API_POST_KEY } from '@/actions/queryKeys';
import PostAddController from '@/app/(main)/(routes)/community/_components/add/PostAddController';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { PostParams } from 'types/params/community';

interface PostAddPageParameter {
    params: PostParams;
}

const PostAddPage: NextPage<PostAddPageParameter> = async ({ params }) => {
    const queryClient = new QueryClient();

    const { postId } = params;

    postId &&
        (await queryClient.prefetchQuery({
            queryKey: [API_POST_KEY, params],
            queryFn: () => getPost({ params }),
        }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PostAddController params={params} />
        </HydrationBoundary>
    );
};

export default PostAddPage;
