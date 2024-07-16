'use client';

import styled from '@emotion/styled';
import { CommunitySearchParams } from 'types/searchParams/community';
import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { API_GET_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import getCommunityDetailComment from 'src/api/community/comment/getCommunityDetailComment';
import { useUpdateParams } from '@hooks/useUpdateParams';
import { Text } from '@components/ui/Text';
import CommunityDetailCommentReply from './CommunityDetailCommentReply';
import getCommunityDetailCommentReply from 'src/api/community/comment/reply/getCommunityDetailCommentReply';
import { API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from 'src/api/community/comment/reply/getCommunityDetailCommentReply';

interface CommunityDetailCommentReplyListProps {
    postId: string;
    commentId: string;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ReplyLoadButton = styled.div`
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const CommunityDetailCommentReplyList = ({
    postId,
    commentId,
}: CommunityDetailCommentReplyListProps) => {
    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, postId, commentId],
        queryFn: ({ pageParam: cursor }) =>
            getCommunityDetailCommentReply({ postId, commentId, cursor }),
        initialPageParam: 0,
        getNextPageParam: ({ cursor }) => {
            return cursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const replyData = data.pages as any;

    return (
        <Container>
            {replyData.map((item: any) =>
                item.data.map((reply: any) => (
                    <CommunityDetailCommentReply key={reply.id} item={reply} />
                )),
            )}
            {hasNextPage && (
                <ReplyLoadButton onClick={onObserve}>
                    <Text text="더보기" size={13} />
                </ReplyLoadButton>
            )}
        </Container>
    );
};

export default CommunityDetailCommentReplyList;
