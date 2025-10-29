import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { NextPage } from 'next';
import { PostParams, PostSearchParams } from 'types/params/community';
import PostServer from '../_components/PostServer';

interface PostPageProps {
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

const PostPage: NextPage<PostPageProps> = async props => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { page = '1' } = searchParams;
    const defaultParams = { ...searchParams, page };

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
            <div className="flex min-h-full w-full max-w-[978px] flex-col items-center">
                <QuerySuspenseErrorBoundary suspenseFallback={<PostPageLoading />}>
                    <PostServer searchParams={defaultParams} params={params} />
                </QuerySuspenseErrorBoundary>
            </div>
        </div>
    );
};

export default PostPage;
