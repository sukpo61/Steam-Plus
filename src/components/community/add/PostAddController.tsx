'use client';

import styled from '@emotion/styled';
import PostAddPageScreen from './PostAddPageScreen';
import { postPost } from 'src/api/community/post/apiPost';
import { getPost } from 'src/api/community/post/apiPost';
import { patchPost } from 'src/api/community/post/apiPost';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_COMMUNITY_LIST_KEY } from 'src/api/community/communityQueryKey';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { API_Post_KEY } from 'src/api/community/communityQueryKey';
import { ImageInputValue } from '@components/ui/ImageInput';
import { useEffect } from 'react';
import { PostParams } from 'types/params/community';

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
        queryKey: [API_Post_KEY, params],
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

    const onSubmit: SubmitHandler<PostAddFormValue> = useCallback((data) => {
        const onSuccess = async (id: string) => {
            await queryCache.resetQueries({
                queryKey: [API_COMMUNITY_LIST_KEY],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_Post_KEY, params],
            });
            replace(`/community`);
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
            form.reset({
                title: prevData.title,
                category: prevData.category,
                content: prevData.content,
                images: prevData.images,
            });
        }
    }, [prevData, form.reset]);

    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit, onSubmitError)}>
                <PostAddPageScreen params={params} />
            </Form>
        </FormProvider>
    );
};

export default PostAddController;
