'use client';

import { getCommentList } from '@/actions/community/comment';
import { API_COMMENT_KEY } from '@/actions/queryKeys';
import { Button } from '@/components/ui/Button';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommentParams } from 'types/params/community';
import { Comment } from './Comment';

interface ReplyListProps {
    params: CommentParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const ReplyList = ({ params }: ReplyListProps) => {
    const { postId, commentId } = params;

    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_COMMENT_KEY, { postId }, { commentId }],
        queryFn: ({ pageParam: cursor }) => getCommentList({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ cursor }) => {
            return cursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const replysData = data.pages;

    return (
        <div className="flex w-full flex-col items-center justify-center">
            {replysData.map((item: any) =>
                item.data.map((reply: any) => (
                    <Comment
                        key={reply.id}
                        item={reply}
                        params={{ ...params, commentId: reply.id, parentId: commentId }}
                    />
                )),
            )}
            {hasNextPage && <Button onClick={onObserve}>더보기</Button>}
        </div>
    );
};

export default ReplyList;
