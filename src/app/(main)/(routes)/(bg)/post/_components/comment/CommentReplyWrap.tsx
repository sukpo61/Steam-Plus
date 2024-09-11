'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { Stat1 } from '@/components/icons/common/Stat1.icon';
import { Stat2 } from '@/components/icons/common/Stat2.icon';
import { ReplyLoading } from '@/components/loading/ReplyLoading';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { CommentResponse } from 'types/community/comment';
import { CommentParams } from 'types/params/community';
import { Comment } from './Comment';
import ReplyList from './ReplyList';

export interface CommentReplyWrapProps {
    params: CommentParams;
    item: {
        comment: CommentResponse;
        replysCount: number;
    };
}

export const CommentReplyWrap = ({ item, params }: CommentReplyWrapProps) => {
    const { comment, replysCount } = item;

    const [isReply, setIsReply] = useState(false);

    return (
        <div className="flex w-full flex-col items-start">
            <Comment item={comment} params={params} />
            <div className="relative flex w-full flex-col items-start pl-14">
                {replysCount !== 0 && (
                    <>
                        <div className="relative -left-2 mb-6">
                            <Button
                                variant="trans"
                                size={'iconl'}
                                onClick={() => setIsReply((e) => !e)}
                            >
                                <div className="flex items-center">
                                    {isReply ? <Stat1 /> : <Stat2 />}
                                    <span>{` 답글 ${replysCount}개`}</span>
                                </div>
                            </Button>
                        </div>
                        {isReply && (
                            <QuerySuspenseErrorBoundary suspenseFallback={<ReplyLoading />}>
                                <ReplyList params={params} />
                            </QuerySuspenseErrorBoundary>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
