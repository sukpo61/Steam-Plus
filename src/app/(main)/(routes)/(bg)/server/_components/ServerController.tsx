'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ServerParams, ServerSearchParams } from 'types/params/server';

import { useSocket } from '@/provider/SocketProvider';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ServerControllerProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
    children: React.ReactNode;
}

export const MAX_CONTENT_LENGTH = 3000;
export const MAX_IMAGES_LENGTH = 1;
export interface ServerControllerValue {
    content: string;
    images: string[];
}

const ServerController = ({ params, searchParams, children }: ServerControllerProps) => {
    const { serverId } = params;
    const { channelId } = searchParams;
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

    const form = useForm<ServerControllerValue>({
        resolver: zodResolver(formSchema),
        values: {
            content: '',
            images: [],
        },
    });

    const { handleSubmit, reset } = form;

    const onSubmit: SubmitHandler<ServerControllerValue> = async (data) => {
        const { content, images } = data;
        socket.emit('message', { content, channelId, serverId });
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

export default ServerController;
