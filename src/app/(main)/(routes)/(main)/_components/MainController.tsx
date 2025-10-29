'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { MainSearchParams } from 'types/params/main';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface MainControllerProps {
    searchParams: MainSearchParams;
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
