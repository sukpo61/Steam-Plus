'use client';

import { API_APP_SEARCH_KEY } from '@/actions/queryKeys';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { getChangedProperties } from '@/utils/getChangedProperties';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageControllerProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
    children: React.ReactNode;
}

export interface CommunityFormValue extends CommunitySearchParams {}

export const CommunityController = ({
    params,
    searchParams,
    children,
}: CommunityPageControllerProps) => {
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { updateParams } = useUpdateParams();
    const queryCache = useQueryClient();

    const form = useForm<CommunityFormValue>({
        defaultValues: searchParams,
    });

    const { handleSubmit, control } = form;

    const onValid = useCallback(
        async ({ term }: CommunityFormValue) => {
            updateParams({ term }, 'push');
            await queryCache.resetQueries({
                queryKey: [API_APP_SEARCH_KEY],
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
        if (!isInitialRender) {
            updateParams(
                getChangedProperties(searchParams, {
                    category: category === 'all' ? '' : category,
                    order: order === 'popular' ? '' : order,
                    page: page === 1 ? '' : page,
                }),
            );
        }
    }, [category, order, page]);

    useEffect(() => {
        setIsInitialRender(false);
    }, []);

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};
