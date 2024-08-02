'use client';

import styled from '@emotion/styled';
import CommunityDetailComment from './CommunityDetailComment';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import getCommunityDetailCommentReply from 'src/api/community/comment/reply/getCommunityDetailCommentReply';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from 'src/api/community/communityQueryKey';
import { Typo } from 'styles/Typography';
import { Text } from '@components/ui/Text';
import { CommunityCommentParams } from 'types/params/community';

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

const CommunityDetailCommentReplyList = ({ params }: CommunityCommentParams) => {
    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, params],
        queryFn: ({ pageParam: cursor }) => getCommunityDetailCommentReply({ params, cursor }),
        initialPageParam: 0,
        getNextPageParam: ({ cursor }) => {
            return cursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const replyData = data.pages;

    return (
        <Container>
            {replyData.map((item: any) =>
                item.data.map((reply: any) => (
                    <CommunityDetailComment
                        key={reply.id}
                        item={reply}
                        params={{ ...params, replyId: reply.id }}
                    />
                )),
            )}
            {hasNextPage && (
                <Text text="더보기" typo={Typo.Body.Body4Regular} onClick={onObserve} underLine />
            )}
        </Container>
    );
};

export default CommunityDetailCommentReplyList;
