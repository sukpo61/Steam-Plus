'use client';

import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postCommunityDetail from 'src/api/community/detail/postCommunityDetail';
import { API_GET_COMMUNITY_LIST_KEY } from 'src/api/community/getCommunityList';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import CommunityAddPageScreen from './CommunityAddPageScreen';
import getCommunityDetail from 'src/api/community/detail/getCommunityDetail';
import patchCommunityDetail from 'src/api/community/detail/patchCommunityDetail';
import { useQuery } from '@tanstack/react-query';
import { API_COMMUNITY_DETAIL_KEY } from 'src/api/community/detail/getCommunityDetail';
import { ImageInputValue } from '@components/ui/ImageInput';

interface CommunityAddControllerProps {
    params: {
        id?: string;
    };
}

export interface CommunityAddFormValue {
    title: string;
    category: string;
    content: string;
    image: ImageInputValue[];
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const CommunityAddController = ({ params }: CommunityAddControllerProps) => {
    const { id } = params;
    const { data } = useQuery({
        queryKey: [API_COMMUNITY_DETAIL_KEY, params],
        queryFn: () => getCommunityDetail({ params }),
        enabled: !!id,
    });

    const queryCache = useQueryClient();
    const { replace } = useRouter();

    const { mutate: patchMutate } = useMutation({
        mutationFn: patchCommunityDetail,
    });

    const { mutate: postMutate } = useMutation({
        mutationFn: postCommunityDetail,
    });

    const form = useForm<CommunityAddFormValue>({
        defaultValues: {
            title: data?.title,
            category: data?.category,
            content: data?.content,
        },
    });

    const onSubmit: SubmitHandler<CommunityAddFormValue> = useCallback((data) => {
        const onSuccess = async (id: string) => {
            await queryCache.invalidateQueries({
                queryKey: [API_GET_COMMUNITY_LIST_KEY],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_COMMUNITY_DETAIL_KEY, params],
            });
            replace(`/community/${id}`);
        };
        if (id) {
            patchMutate(
                { data, params },
                {
                    onSuccess: onSuccess,
                    onError: (error) => {},
                },
            );
            return;
        }
        postMutate(
            { data },
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

    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit, onSubmitError)}>
                <CommunityAddPageScreen params={params} />
            </Form>
        </FormProvider>
    );
};

export default CommunityAddController;
