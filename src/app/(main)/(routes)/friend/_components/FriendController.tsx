'use client';

import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FriendParams, FriendSearchParams } from 'types/params/friend';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateParams } from '@/hooks/useUpdateParams';

interface CommunityPageControllerProps {
    params: FriendParams;
    searchParams: FriendSearchParams;
    children: React.ReactNode;
}

export interface CommunityFormValue {
    type?: string;
    term?: string;
}

export const FriendController = ({ searchParams, children }: CommunityPageControllerProps) => {
    const { updateParams } = useUpdateParams({
        defaultParams: { type: 'all', term: '' },
    });
    const queryCache = useQueryClient();

    const form = useForm<CommunityFormValue>({
        defaultValues: searchParams,
    });

    const { handleSubmit, control } = form;

    const onSubmit: SubmitHandler<CommunityFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        const { term } = data;
        updateParams({
            term,
        });
    };

    const type = useWatch({ control, name: 'type' });

    useEffect(() => {
        updateParams({
            type,
        });
    }, [type]);

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};
