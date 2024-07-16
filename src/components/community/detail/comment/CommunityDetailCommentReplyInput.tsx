'use client';

import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import TextArea from '@components/ui/TextArea';
import { API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from 'src/api/community/comment/reply/getCommunityDetailCommentReply';
import postCommunityDetailCommentReply from 'src/api/community/comment/reply/postCommunityDetailCommentReply';

interface CommunityDetailCommentReplyInputProps {
    postId: string;
    commentId: string;
}

export interface CommentFormValue {
    postId: string;
    commentId: string;
    commentReply: string;
}

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 16px;
    margin-top: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;

    align-items: start;
    justify-content: flex-end;
`;

const InputContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
`;

const CommunityDetailCommentReplyInput = ({
    postId,
    commentId,
}: CommunityDetailCommentReplyInputProps) => {
    const queryCache = useQueryClient();

    const { mutate: postMutate } = useMutation({
        mutationFn: postCommunityDetailCommentReply,
    });

    const { register, handleSubmit, reset } = useForm<CommentFormValue>({
        defaultValues: {
            postId: '',
            commentId: '',
            commentReply: '',
        },
    });
    const onSubmit: SubmitHandler<CommentFormValue> = useCallback((data) => {
        postMutate(
            { ...data, postId, commentId },
            {
                onSuccess: async () => {
                    await queryCache.invalidateQueries({
                        queryKey: [API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY],
                    });
                    reset();
                },
            },
        );
    }, []);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <TextArea placeholder="댓글을 입력하세요." {...register('commentReply')} />
            </InputContainer>
            <ButtonContainer>
                <Button text="등록" onClick={handleSubmit(onSubmit)} />
            </ButtonContainer>
        </Form>
    );
};

export default CommunityDetailCommentReplyInput;
