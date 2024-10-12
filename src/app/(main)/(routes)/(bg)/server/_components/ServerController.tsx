'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ServerControllerProps {
    params: any;
    children: React.ReactNode;
}
export interface ServerControllerValue {}

const ServerController = ({ params, children }: ServerControllerProps) => {
    const queryCache = useQueryClient();
    const { replace } = useRouter();

    const formSchema = z.object({});

    const form = useForm<ServerControllerValue>({
        resolver: zodResolver(formSchema),
        values: {
            content: '',
            images: [],
        },
    });

    const { handleSubmit } = form;

    const onSubmit: SubmitHandler<ServerControllerValue> = async (data) => {};

    const onSubmitError = (errors: Object) => {
        for (const error of Object.values(errors)) {
            alert(error.message);
            break;
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex h-full w-full" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default ServerController;
