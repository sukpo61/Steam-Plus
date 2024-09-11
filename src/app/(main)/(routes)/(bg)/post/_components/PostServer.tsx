import { getCommentList } from '@/actions/community/comment';
import { getPost } from '@/actions/community/post';
import { API_COMMENT_KEY, API_POST_KEY } from '@/actions/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PostParams, PostSearchParams } from 'types/params/community';
import { CommentList } from './comment/CommentList';
import { PostClient } from './PostClient';

interface PostServerProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const PostServer = async ({ searchParams, params }: PostServerProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_POST_KEY, params],
        queryFn: () => getPost({ params }),
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: [API_COMMENT_KEY, params],
        queryFn: ({ pageParam: cursor }) => getCommentList({ params, cursor }),
        initialPageParam: null,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <>
                <PostClient params={params} />
                <CommentList searchParams={searchParams} params={params} />
            </>
        </HydrationBoundary>
    );
};

export default PostServer;
