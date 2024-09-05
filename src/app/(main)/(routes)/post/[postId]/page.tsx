import { getComment } from '@/actions/community/comment';
import { getPost } from '@/actions/community/post';
import { API_COMMENT_KEY, API_POST_KEY } from '@/actions/queryKeys';
import PostPageScreen from '@/app/(main)/(routes)/post/_components/PostPageScreen';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { PostParams, PostSearchParams } from 'types/params/community';

interface PostPageProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const PostPage: NextPage<PostPageProps> = async ({ searchParams, params }) => {
    const { page = '1' } = searchParams;
    const mergedParams = { ...searchParams, page };

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [API_POST_KEY, params],
        queryFn: () => getPost({ params }),
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: [API_COMMENT_KEY, params],
        queryFn: ({ pageParam: cursor }) => getComment({ params, cursor }),
        initialPageParam: null,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PostPageScreen searchParams={mergedParams} params={params} />
        </HydrationBoundary>
    );
};

export default PostPage;
