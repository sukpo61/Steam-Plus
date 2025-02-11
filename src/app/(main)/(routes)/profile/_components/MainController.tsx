'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SearchParams } from 'types/params/search';

interface MainControllerProps {
    searchParams: SearchParams;
    children: React.ReactNode;
}

export interface MainFormValue {
    term: string;
}

export const MainController = ({ searchParams, children }: MainControllerProps) => {
    const { push } = useRouter();

    const form = useForm<MainFormValue>({});

    const { handleSubmit } = form;

    const onValid = useCallback(
        async ({ term }: MainFormValue) => {
            push(`/search?term=${term}`);
        },
        [useRouter],
    );

    const onSubmit: SubmitHandler<MainFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        onValid(data);
    };

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};
