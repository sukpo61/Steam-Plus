'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { CommentRequest } from 'types/community/comment';
import { ServerParams } from 'types/params/server';
import { TextImageInput } from '@/components/ui/TextImageInput';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/provider/SocketProvider';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditInputProps {
    item?: any;
    params: ServerParams;
    id?: string;
    defaultValues?: CommentFormValue;
    closeInput: () => void;
}

export interface CommentFormValue extends CommentRequest {}

export const MAX_CONTENT_LENGTH = 3000;
export const MAX_IMAGES_LENGTH = 1;

export const EditInput = ({ item, params, closeInput }: EditInputProps) => {
    const { serverId } = params;

    const { id, content, images } = item;

    const defaultValues = { content, images: [] };

    const queryCache = useQueryClient();

    const { socket } = useSocket();

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

    const onSubmit: SubmitHandler<CommentFormValue> = async (data) => {
        console.log('edit', { id, serverId, ...data });

        if (defaultValues) {
            socket.emit('edit', { id, serverId, ...data });
            closeInput();
            return;
        }
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
                />
            </form>
        </FormProvider>
    );
};
