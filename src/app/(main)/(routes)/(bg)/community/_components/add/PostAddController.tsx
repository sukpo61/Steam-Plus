'use client';

import { getPost, patchPost, postPost } from '@/actions/community/post';
import { API_COMMUNITY_KEY, API_POST_KEY } from '@/actions/queryKeys';
import { ImageInputValue } from '@/components/ui/ImageInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CommunityParams, PostParams } from 'types/params/community';
import z from 'zod';

interface PostAddControllerProps {
    params: PostParams & CommunityParams;
    children: React.ReactNode;
}
export interface PostAddFormValue {
    title: string;
    category: string;
    content: string;
    images: ImageInputValue[];
}

export const MAX_TITLE_LENGTH = 300;
export const MAX_CONTENT_LENGTH = 1000;
export const MAX_IMAGES_LENGTH = 5;

export const PostAddController = ({ params, children }: PostAddControllerProps) => {
    const { postId } = params;

    const { data: prevData } = useQuery({
        queryKey: [API_POST_KEY, params],
        queryFn: () => getPost({ params }),
        enabled: !!postId,
    });

    const queryCache = useQueryClient();
    const { replace } = useRouter();

    const formSchema = z
        .object({
            title: z.string().min(1, { message: '제목을 입력하세요.' }),
            category: z.string(),
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

    const form = useForm<PostAddFormValue>({
        resolver: zodResolver(formSchema),
        values: {
            title: prevData?.title || '',
            category: prevData?.category || 'free',
            content: prevData?.content || '',
            images: prevData?.images || [],
        },
    });

    const onSuccess = async (id: string) => {
        await queryCache.resetQueries({
            queryKey: [API_COMMUNITY_KEY],
        });
        await queryCache.resetQueries({
            queryKey: [API_POST_KEY, { postId }],
        });
        replace(`/post/${id}`);
    };

    const { mutateAsync: patchMutate } = useMutation({
        mutationFn: patchPost,
        onSuccess: onSuccess,
    });

    const { mutateAsync: postMutate } = useMutation({
        mutationFn: postPost,
        onSuccess: onSuccess,
    });

    const { handleSubmit } = form;

    const onSubmit: SubmitHandler<PostAddFormValue> = async (data) => {
        if (postId) {
            await patchMutate({ params, data });
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
            <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                {children}
            </form>
        </FormProvider>
    );
};
