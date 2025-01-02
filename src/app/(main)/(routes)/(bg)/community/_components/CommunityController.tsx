'use client';

import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

import { API_SEARCH_KEY } from '@/actions/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateParams } from '@/hooks/useUpdateParams';

interface CommunityPageControllerProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
    children: React.ReactNode;
}

export interface CommunityFormValue extends CommunitySearchParams {}

export const CommunityController = ({ searchParams, children }: CommunityPageControllerProps) => {
    const { updateParams } = useUpdateParams({
        defaultParams: { category: 'all', order: 'popular', page: '1' },
    });
    const queryCache = useQueryClient();

    const form = useForm<CommunityFormValue>({
        defaultValues: searchParams,
    });

    const { handleSubmit, control } = form;

    const onValid = useCallback(
        async ({ term }: CommunityFormValue) => {
            updateParams({ term }, 'push');
            await queryCache.invalidateQueries({
                queryKey: [API_SEARCH_KEY],
            });
        },
        [updateParams],
    );

    const onSubmit: SubmitHandler<CommunityFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        onValid(data);
    };

    const category = useWatch({ control, name: 'category' });
    const order = useWatch({ control, name: 'order' });
    const page = useWatch({ control, name: 'page' });

    useEffect(() => {
        updateParams({
            category,
            order,
            page,
        });
    }, [category, order, page]);

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};
