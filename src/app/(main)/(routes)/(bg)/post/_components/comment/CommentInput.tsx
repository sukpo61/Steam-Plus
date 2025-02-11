'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { patchComment, postComment } from '@/actions/community/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_COMMENT_KEY } from '@/actions/queryKeys';
import { CommentParams } from 'types/params/community';
import { CommentRequest } from 'types/community/comment';
import { Editor } from '@/components/ui/Editor';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentInputProps {
    params: CommentParams;
    id?: string;
    defaultValues?: CommentFormValue;
    closeInput?: () => void;
}

export interface CommentFormValue extends CommentRequest {}

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

    const { mutateAsync: postMutate } = useMutation({
        mutationFn: postComment,
        onSuccess: onSuccess,
    });

    const { mutateAsync: patchMutate } = useMutation({
        mutationFn: patchComment,
        onSuccess: onSuccess,
    });

    const onSubmit: SubmitHandler<CommentFormValue> = async (data) => {
        if (defaultValues && id) {
            await patchMutate({ data, params: { ...params, postId } });
            return;
        }
        await postMutate({ data, params });
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
                <Editor
                    placeholder="댓글을 입력하세요."
                    onCancle={closeInput}
                    imageMaxlength={MAX_IMAGES_LENGTH}
                    textMaxHeight={240}
                    textMaxLength={MAX_CONTENT_LENGTH}
                />
            </form>
        </FormProvider>
    );
};
