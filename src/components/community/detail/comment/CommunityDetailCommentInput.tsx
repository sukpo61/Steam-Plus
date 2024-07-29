'use client';

import styled from '@emotion/styled';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postCommunityDetailComment from 'src/api/community/comment/postCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from 'src/api/community/comment/reply/getCommunityDetailCommentReply';
import patchCommunityDetailComment from 'src/api/community/comment/patchCommunityDetailComment';
import TextImageInput from '@components/ui/TextImageInput';
import { ImageInputValue } from '@components/ui/ImageInput';

interface CommunityDetailCommentInputProps {
    params: {
        postId: string;
        commentId?: string;
        replyId?: string;
    };
    id?: string;
    defaultValues?: any;
    closeInput?: () => void;
}

export interface CommentFormValue {
    comment: string;
    image: ImageInputValue[];
}

const Form = styled.form`
    display: flex;
    width: 100%;
`;

const CommunityDetailCommentInput = ({
    id,
    params,
    defaultValues,
    closeInput,
}: CommunityDetailCommentInputProps) => {
    const { postId, commentId } = params;

    const queryCache = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
    } = useForm<CommentFormValue>({
        defaultValues: defaultValues,
    });

    const image = useWatch({ control, name: 'image' });

    const { mutate: postMutate } = useMutation({
        mutationFn: postCommunityDetailComment,
    });

    const { mutate: patchMutate } = useMutation({
        mutationFn: patchCommunityDetailComment,
    });

    const onSubmit: SubmitHandler<CommentFormValue> = (data) => {
        const onSuccess = async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_COMMUNITY_DETAIL_COMMENT_KEY, { postId }],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, { postId, commentId }],
            });
            reset();
            closeInput?.();
        };
        if (defaultValues && id) {
            patchMutate(
                { id, data, params },
                {
                    onSuccess: onSuccess,
                },
            );
            return;
        }
        postMutate(
            { data, params },
            {
                onSuccess: onSuccess,
            },
        );
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextImageInput
                placeholder="댓글을 입력하세요."
                register={register}
                setValue={setValue}
                cancle={closeInput}
                errorMessage={errors.comment?.message}
                image={image || []}
            />
        </Form>
    );
};

export default CommunityDetailCommentInput;
