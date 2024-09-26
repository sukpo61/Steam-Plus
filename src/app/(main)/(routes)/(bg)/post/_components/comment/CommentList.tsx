'use client';

import { CommentParams, PostSearchParams } from 'types/params/community';

import { API_COMMENT_KEY } from '@/actions/queryKeys';
import { CommentInput } from './CommentInput';
import { CommentReplyWrap } from './CommentReplyWrap';
import { DefaultLoading } from '@/components/common/DefaultLoading';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import { RestartIcon } from '@/components/icons/common/Restart.icon';
import { getCommentList } from '@/actions/community/comment';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface CommentListProps {
    searchParams: PostSearchParams;
    params: CommentParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const CommentList = ({ params, searchParams }: CommentListProps) => {
    const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
        queryKey: [API_COMMENT_KEY, params],
        queryFn: ({ pageParam: cursor }) => getCommentList({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const commentsData = data.pages;

    const commentCount = commentsData[0].commentCount;

    return (
        <div className="flex w-full max-w-[948px] flex-1 flex-col items-center bg-primary px-8 py-4">
            <div className="mb-4 flex w-full gap-1 pl-1">
                <span className="text">댓글</span>
                <span>{commentCount}</span>
                <button onClick={() => refetch()}>
                    <RestartIcon />
                </button>
            </div>
            <div className="mb-4 flex w-full">
                <CommentInput params={params} />
            </div>
            <div className="flex w-full flex-col px-1">
                {commentCount === 0 ? (
                    <span className="base">댓글이 없습니다.</span>
                ) : (
                    <ObserverTrigger onObserve={onObserve}>
                        {commentsData.map((page: any) =>
                            page.data.map((item: any) => (
                                <CommentReplyWrap
                                    key={item.id}
                                    item={item}
                                    params={{ ...params, commentId: item.comment.id }}
                                />
                            )),
                        )}
                    </ObserverTrigger>
                )}
                {isPending && (
                    <div className="flex h-8 w-full">
                        <DefaultLoading />
                    </div>
                )}
            </div>
        </div>
    );
};
