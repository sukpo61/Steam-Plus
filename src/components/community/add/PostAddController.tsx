'use client';

import { ImageInputValue } from '@/components/ui/ImageInput';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { API_COMMUNITY_LIST_KEY } from 'src/api/community/communityQueryKey';
import { API_POST_KEY, getPost, patchPost, postPost } from 'src/api/community/post/apiPost';
import { PostParams } from 'types/params/community';
import PostAddPageScreen from './PostAddPageScreen';

interface PostAddControllerProps {
    params: PostParams;
}
export interface PostAddFormValue {
    title: string;
    category: string;
    content: string;
    images: ImageInputValue[];
    channelId: string;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PostAddController = ({ params }: PostAddControllerProps) => {
    const { channelId, postId } = params;

    const { data: prevData } = useQuery({
        queryKey: [API_POST_KEY, { postId }],
        queryFn: () => getPost({ params }),
        enabled: !!postId,
    });

    const queryCache = useQueryClient();
    const { replace } = useRouter();

    const { mutate: patchMutate } = useMutation({
        mutationFn: patchPost,
    });

    const { mutate: postMutate } = useMutation({
        mutationFn: postPost,
    });

    const form = useForm<PostAddFormValue>({
        defaultValues: {
            title: prevData?.title || '',
            category: prevData?.category || 'free',
            content: prevData?.content || '',
            images: prevData?.images || [],
            channelId: channelId,
        },
    });

    const { handleSubmit, reset } = form;

    const onSubmit: SubmitHandler<PostAddFormValue> = useCallback((data) => {
        const onSuccess = async (id: string) => {
            await queryCache.resetQueries({
                queryKey: [API_COMMUNITY_LIST_KEY],
            });
            await queryCache.resetQueries({
                queryKey: [API_POST_KEY, params],
            });
            replace(`/community/${channelId}/post/${id}`);
        };
        if (postId) {
            patchMutate(
                { params, data },
                {
                    onSuccess: onSuccess,
                    onError: (error) => {},
                },
            );
            return;
        }
        postMutate(
            { data, params },
            {
                onSuccess: onSuccess,
                onError: (error) => {},
            },
        );
    }, []);

    const onSubmitError = (errors: any) => {
        if (errors.title) {
            alert(errors.title.message);
            return;
        }
        if (errors.content) {
            alert(errors.content.message);
            return;
        }
    };

    useEffect(() => {
        if (prevData) {
            reset({
                title: prevData.title,
                category: prevData.category,
                content: prevData.content,
                images: prevData.images,
            });
        }
    }, [prevData, reset]);

    return (
        <FormProvider {...form}>
            <Form
                className="flex w-full max-w-[948px]"
                onSubmit={handleSubmit(onSubmit, onSubmitError)}
            >
                <PostAddPageScreen params={params} />
            </Form>
        </FormProvider>
    );
};

export default PostAddController;
