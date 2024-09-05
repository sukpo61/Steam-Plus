import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { BgLayout } from '@/components/layout/main/bgLayout';
import { PostParams, PostSearchParams } from 'types/params/community';
import CommentList from './comment/CommentList';
import Post from './Post';

interface PostPageScreenProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

const PostPageLoading = () => {
    return (
        <>
            <div className="flex h-[100px] w-full bg-primary-dark p-8" />
            <div className="flex w-full max-w-[948px] flex-1 flex-col items-start bg-primary px-8 pt-4" />
        </>
    );
};

const PostPageScreen = ({ searchParams, params }: PostPageScreenProps) => {
    return (
        <BgLayout>
            <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
                <div className="flex min-h-full w-full max-w-[978px] flex-col items-center">
                    <QuerySuspenseErrorBoundary suspenseFallback={<PostPageLoading />}>
                        <Post params={params} />
                        <CommentList searchParams={searchParams} params={params} />
                    </QuerySuspenseErrorBoundary>
                </div>
            </div>
        </BgLayout>
    );
};

export default PostPageScreen;
