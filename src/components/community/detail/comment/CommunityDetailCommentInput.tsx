'use client';

import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import postCommunityDetailComment from 'src/api/community/comment/postCommunityDetailComment';
import { API_GET_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import TextArea from '@components/ui/TextArea';

interface CommunityDetailCommentInputProps {
    params: {
        id: string;
    };
}

export interface CommentFormValue {
    postId: string;
    comment: string;
}

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 16px;
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 16px;
`;

const CommunityDetailCommentInput = ({ params }: CommunityDetailCommentInputProps) => {
    const { id: postId } = params;

    const queryCache = useQueryClient();

    const { mutate: postMutate } = useMutation({
        mutationFn: postCommunityDetailComment,
    });

    const { register, handleSubmit, reset } = useForm<CommentFormValue>({
        defaultValues: {
            postId: '',
            comment: '',
        },
    });
    const onSubmit: SubmitHandler<CommentFormValue> = useCallback((data) => {
        postMutate(
            { ...data, postId },
            {
                onSuccess: async () => {
                    await queryCache.invalidateQueries({
                        queryKey: [API_GET_COMMUNITY_DETAIL_COMMENT_KEY],
                    });
                    reset();
                },
            },
        );
    }, []);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <TextArea placeholder="댓글을 입력하세요." {...register('comment')} />
            </InputContainer>
            <ButtonContainer>
                <Button text="등록" onClick={handleSubmit(onSubmit)} />
            </ButtonContainer>
        </Form>
    );
};

export default CommunityDetailCommentInput;
