'use client';

import styled from '@emotion/styled';
import ReplyList from './ReplyList';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import Comment from './Comment';
import ReplyLoading from '@components/loading/ReplyLoading';
import Stat1 from '@components/icons/common/Stat1.icon';
import Stat2 from '@components/icons/common/Stat2.icon';
import { useState } from 'react';
import { Button } from '@components/ui/Button';
import { CommentResponse } from 'types/community/comment';
import { CommentParams } from 'types/params/community';

export interface CommentReplyWrapProps {
    params: CommentParams;
    item: CommentResponse;
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

const CommentReplyWrap = ({ item, params }: CommentReplyWrapProps) => {
    const replyCount = 0;
    const [isReply, setIsReply] = useState(false);

    return (
        <Container>
            <Comment item={item} params={params} />
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
                            <QuerySuspenseErrorBoundary suspenseFallback={<ReplyLoading />}>
                                <ReplyList params={params} />
                            </QuerySuspenseErrorBoundary>
                        )}
                    </>
                )}
            </ReplyContainer>
        </Container>
    );
};

export default CommentReplyWrap;
