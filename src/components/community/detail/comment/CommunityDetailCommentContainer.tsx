'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import CommunityDetailCommentReplyList from './CommunityDetailCommentReplyList';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import { Button } from '@components/ui/Button';
import { CommunitySearchParams } from 'types/searchParams/community';
import CommunityDetailComment from './CommunityDetailComment';
import Stat1 from '@components/icons/common/Stat1.icon';
import Stat2 from '@components/icons/common/Stat2.icon';

export interface CommunityDetailCommentContainerProps {
    item: any;
    searchParams: CommunitySearchParams;
    params: {
        postId: string;
        commentId: string;
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
`;

const ReplyContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    padding-left: 52px;
`;

const ReplyButtonContainer = styled.div`
    position: relative;
    left: -16px;
    margin-bottom: 24px;
`;
const ReplyButtonText = styled.div`
    display: flex;
    align-items: center;
`;

const CommunityDetailCommentContainer = ({
    item,
    params,
}: CommunityDetailCommentContainerProps) => {
    const { subcollectionCount: replyCount } = item;
    const [isReply, setIsReply] = useState(false);

    return (
        <Container>
            <CommunityDetailComment item={item} params={params} />
            <ReplyContainer>
                {replyCount && (
                    <>
                        <ReplyButtonContainer>
                            <Button
                                text={
                                    <ReplyButtonText>
                                        {isReply ? <Stat1 /> : <Stat2 />}
                                        <span>{` 답글 ${replyCount}개`}</span>
                                    </ReplyButtonText>
                                }
                                buttonType="reply"
                                onClick={() => setIsReply((e) => !e)}
                            />
                        </ReplyButtonContainer>
                        {isReply && (
                            <QuerySuspenseErrorBoundary>
                                <CommunityDetailCommentReplyList params={params} />
                            </QuerySuspenseErrorBoundary>
                        )}
                    </>
                )}
            </ReplyContainer>
        </Container>
    );
};

export default CommunityDetailCommentContainer;
