'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { SubmitHandler, useForm } from 'react-hook-form';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { postChannel } from '@/actions/channel/channel';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalFormValue {
    name: string;
}

export const MAX_NAME_LENGTH = 15;
export const MAX_DESCRIPTION_LENGTH = 200;

export const CreateChannelModal = () => {
    const { push } = useRouter();
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const [step, setStep] = useState(1);
    const isModalOpen = isOpen && type === 'createChannel';
    const { serverId } = data;

    const formSchema = z.object({
        name: z
            .string()
            .max(MAX_NAME_LENGTH, { message: `최대 입력 ${MAX_NAME_LENGTH}자 초과` })
            .min(1, { message: `이름을 입력하세요` }),
    });

    const form = useForm<ModalFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { mutateAsync: postMutate } = useMutation({
        mutationFn: postChannel,
        onSuccess: async () => {
            console.log('querykey', [API_SERVER_KEY, { serverId }]);
            await queryCache.invalidateQueries({
                queryKey: [API_SERVER_KEY],
            });
            handleClose();
        },
    });

    const handleClose = () => {
        reset();
        onClose();
        setStep(1);
    };

    const onValid = async (data: ModalFormValue) => {
        console.log('data', data, serverId);
        serverId && postMutate({ data, params: { serverId } });
    };

    const onSubmit: SubmitHandler<ModalFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        if (event instanceof KeyboardEvent && event.key === 'Enter' && step === 1) {
            setStep(2);
            return;
        }

        onValid(data);
    };

    const onSubmitError = (errors: Object) => {
        for (const error of Object.values(errors)) {
            alert(error.message);
            break;
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden bg-primary p-4">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-primary-foreground">
                        채널를 만들어보세요.
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onSubmitError)}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        <Input {...register('name')} />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
