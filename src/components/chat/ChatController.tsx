'use client';

import { DMParams, DMSearchParams } from 'types/params/dm';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ServerParams, ServerSearchParams } from 'types/params/server';

import { ImageInputValue } from '@/components/ui/ImageInput';
import { getImageUrl } from '@/actions/image/getImageUrl';
import { useSocket } from '@/provider/SocketProvider';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ChatControllerProps {
    params: any;
    children: React.ReactNode;
}

export const MAX_CONTENT_LENGTH = 3000;
export const MAX_IMAGES_LENGTH = 3;
export interface ChatControllerValue {
    content: string;
    images: ImageInputValue[];
}

const ChatController = ({ params, children }: ChatControllerProps) => {
    const { channelId, userId } = params || {};
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

    const form = useForm<ChatControllerValue>({
        resolver: zodResolver(formSchema),
        values: {
            content: '',
            images: [],
        },
    });

    const { handleSubmit, reset } = form;

    const onSubmit: SubmitHandler<ChatControllerValue> = async (data) => {
        const { content, images } = data;
        try {
            const imagesUrl = images
                ? await getImageUrl({
                      images,
                      url: 'images',
                  })
                : [];

            if (userId) {
                socket.emit('dmMessage', { content, images: imagesUrl, userId });
            } else {
                socket.emit('message', { content, images: imagesUrl, channelId });
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        reset();
    };

    const onSubmitError = (errors: Object) => {
        for (const error of Object.values(errors)) {
            alert(error.message);
            break;
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default ChatController;
