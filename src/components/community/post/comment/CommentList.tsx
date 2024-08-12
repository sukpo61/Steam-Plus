'use client';

import { API_COMMENT_KEY, getComment } from '@/actions/community/comment';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import { RestartIcon } from '@/components/icons/common/Restart.icon';
import { Text } from '@/components/ui/Text';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommentParams, PostSearchParams } from 'types/params/community';
import { CommentInput } from './CommentInput';
import { CommentReplyWrap } from './CommentReplyWrap';

interface CommentListProps {
    searchParams: PostSearchParams;
    params: CommentParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const CommentList = ({ params, searchParams }: CommentListProps) => {
    const { postId } = params;

    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const { fetchNextPage, hasNextPage, data, refetch } = useSuspenseInfiniteQuery({
        queryKey: [API_COMMENT_KEY, { postId }],
        queryFn: ({ pageParam: cursor }) => getComment({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const commentsData = data.pages;

    const { totalCount } = commentsData[0];

    return (
        <div className="flex w-full max-w-[948px] flex-1 flex-col items-center bg-primary px-8 py-4">
            <div className="mb-4 flex w-full gap-1 pl-1">
                <Text text={'댓글'} />
                <Text text={totalCount} />
                <button onClick={() => refetch()}>
                    <RestartIcon />
                </button>
            </div>
            <div className="mb-4 flex w-full">
                <CommentInput params={params} />
            </div>
            <div className="flex w-full flex-col px-1">
                {totalCount === 0 ? (
                    <span className="base">댓글이 없습니다.</span>
                ) : (
                    <ObserverTrigger onObserve={onObserve}>
                        {commentsData.map((item: any) =>
                            item.data.map((item: any) => (
                                <CommentReplyWrap
                                    key={item.id}
                                    item={item}
                                    params={{ ...params, commentId: item.comment.id }}
                                />
                            )),
                        )}
                    </ObserverTrigger>
                )}
            </div>
        </div>
    );
};

export default CommentList;
