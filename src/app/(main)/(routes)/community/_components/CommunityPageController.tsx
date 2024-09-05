'use client';

import { API_APP_SEARCH_KEY } from '@/actions/queryKeys';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { getChangedProperties } from '@/utils/getChangedProperties';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import CommunityPageScreen from './CommunityPageScreen';

interface CommunityPageControllerProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export interface CommunityFormValue extends CommunitySearchParams {}

const CommunityPageController = ({ params, searchParams }: CommunityPageControllerProps) => {
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
        console.log('datasearch', data);

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
                <CommunityPageScreen params={params} searchParams={searchParams} />
            </form>
        </FormProvider>
    );
};

export default CommunityPageController;
