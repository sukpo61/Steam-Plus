'use client';

import { API_COMMENT_KEY, patchComment, postComment } from '@/actions/community/comment';
import { ImageInputValue } from '@/components/ui/ImageInput';
import { TextImageInput } from '@/components/ui/TextImageInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CommentParams } from 'types/params/community';
import z from 'zod';

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

export const MAX_CONTENT_LENGTH = 3000;
export const MAX_IMAGES_LENGTH = 1;

export const CommentInput = ({ id, params, defaultValues, closeInput }: CommentInputProps) => {
    const { postId, commentId } = params;

    const queryCache = useQueryClient();

    const formSchema = z
        .object({
            content: z
                .string()
                .max(MAX_CONTENT_LENGTH, { message: `최대 입력 ${MAX_CONTENT_LENGTH}자 초과` }),
            images: z.array(z.any()).max(MAX_IMAGES_LENGTH, {
                message: `최대 ${MAX_IMAGES_LENGTH}개의 이미지까지 업로드할 수 있습니다.`,
            }),
        })
        .refine((data) => !(data.images.length === 0 && data.content.length === 0), {
            message: '내용을 입력하세요.',
            path: ['content'],
        });

    const form = useForm<CommentFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            content: '',
            images: [],
        },
    });

    const { handleSubmit, reset } = form;

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

    const { mutate: postMutate, isPending: postIsPending } = useMutation({
        mutationFn: postComment,
        onSuccess: onSuccess,
    });

    const { mutate: patchMutate, isPending: patchIsPending } = useMutation({
        mutationFn: patchComment,
        onSuccess: onSuccess,
    });

    const onSubmit: SubmitHandler<CommentFormValue> = (data) => {
        if (defaultValues && id) {
            patchMutate({ data, params: { ...params, postId } });
            return;
        }
        postMutate({ data, params });
    };

    const onSubmitError = (errors: Object) => {
        for (const error of Object.values(errors)) {
            alert(error.message);
            break;
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex w-full" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                <TextImageInput
                    placeholder="댓글을 입력하세요."
                    cancle={closeInput}
                    imageMaxlength={MAX_IMAGES_LENGTH}
                    textMaxHeight={240}
                    textMaxLength={MAX_CONTENT_LENGTH}
                    isPending={postIsPending || patchIsPending}
                />
            </form>
        </FormProvider>
    );
};
