'use client';

import { ImageInputValue } from '@/components/ui/ImageInput';
import { TextImageInput } from '@/components/ui/TextImageInput';
import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { patchComment } from 'src/api/community/comment/patchComment';
import { API_COMMENT_KEY, postComment } from 'src/api/community/comment/postComment';
import { CommentParams } from 'types/params/community';

interface CommentInputProps {
    params: CommentParams;
    id?: string;
    defaultValues?: CommentFormValue;
    closeInput?: () => void;
}

export interface CommentFormValue {
    content: string;
    images: ImageInputValue[];
    like?: string;
}

const Form = styled.form`
    display: flex;
    width: 100%;
`;

export const CommentInput = ({ id, params, defaultValues, closeInput }: CommentInputProps) => {
    const { postId, commentId } = params;

    const queryCache = useQueryClient();

    const form = useForm<CommentFormValue>({
        defaultValues: defaultValues || {
            content: '',
            images: [],
        },
    });

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    const { mutate: postMutate } = useMutation({
        mutationFn: postComment,
    });

    const { mutate: patchMutate } = useMutation({
        mutationFn: patchComment,
    });

    const onSubmit: SubmitHandler<CommentFormValue> = (data) => {
        const { images = [], content } = data;

        if (images.length === 0 && content.length === 0) {
            alert('내용을 입력하세요.');
            return;
        }

        const onSuccess = async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_COMMENT_KEY, { postId }],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_COMMENT_KEY, { commentId }],
            });
            reset();
            closeInput?.();
        };
        if (defaultValues && id) {
            patchMutate(
                { data, params: { ...params, postId } },
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
        <FormProvider {...form}>
            <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
                <TextImageInput
                    placeholder="댓글을 입력하세요."
                    cancle={closeInput}
                    errorMessage={errors.content?.message}
                    imageMaxlength={1}
                />
            </form>
        </FormProvider>
    );
};
