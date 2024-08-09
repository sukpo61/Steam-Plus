'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import PostLoading from '@/components/loading/PostLoading';
import { PostParams, PostSearchParams } from 'types/params/community';
import CommentList from './comment/CommentList';
import Post from './Post';

interface PostPageScreenProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const PostPageScreen = ({ searchParams, params }: PostPageScreenProps) => {
    return (
        <div className="flex min-h-full w-full max-w-[978px] flex-col items-center">
            <QuerySuspenseErrorBoundary suspenseFallback={<PostLoading />}>
                <Post params={params} />
                <CommentList searchParams={searchParams} params={params} />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default PostPageScreen;
