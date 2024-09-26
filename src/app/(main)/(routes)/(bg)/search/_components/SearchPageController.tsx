'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { API_APP_SEARCH_KEY } from '@/actions/queryKeys';
import SearchPageScreen from './SearchPageScreen';
import { SearchParams } from 'types/params/search';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateParams } from '@/hooks/useUpdateParams';

interface SearchPageControllerProps {
    searchParams: SearchParams;
}

export interface SearchFormValue {
    term: string;
}

const SearchPageController = ({ searchParams }: SearchPageControllerProps) => {
    const { term } = searchParams;
    const { updateParams } = useUpdateParams();
    const queryCache = useQueryClient();

    const form = useForm<SearchFormValue>({
        defaultValues: {
            term,
        },
    });

    const { handleSubmit } = form;

    const onValid = useCallback(
        async ({ term }: SearchFormValue) => {
            updateParams({ term });
            await queryCache.invalidateQueries({
                queryKey: [API_APP_SEARCH_KEY],
            });
        },
        [updateParams],
    );

    const onSubmit: SubmitHandler<SearchFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        onValid(data);
    };

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit)}>
                <SearchPageScreen searchParams={searchParams} />
            </form>
        </FormProvider>
    );
};

export default SearchPageController;
