'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { CommentRequest } from 'types/community/comment';
import { useSocket } from '@/provider/SocketProvider';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditInputProps {
    item?: any;
    defaultValues?: CommentFormValue;
    isDM?: boolean;
    children: React.ReactNode;
    closeInput: () => void;
}

export interface CommentFormValue extends CommentRequest {}

export const MAX_CONTENT_LENGTH = 3000;
export const MAX_IMAGES_LENGTH = 1;

export const EditController = ({ children, item, closeInput, isDM }: EditInputProps) => {
    const { id, content, images } = item;

    const defaultValues = { content, images };

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

    const { handleSubmit } = form;

    const onSubmit: SubmitHandler<CommentFormValue> = async (data) => {
        if (defaultValues) {
            socket.emit(isDM ? 'dmEdit' : 'edit', { id, ...data });
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
                {children}
            </form>
        </FormProvider>
    );
};
