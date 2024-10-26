'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { SubmitHandler, useForm } from 'react-hook-form';

import { API_APP_KEY } from '@/actions/queryKeys';
import { FirstStep } from './FirstStep';
import { FormProvider } from 'react-hook-form';
import Image from 'next/image';
import { SecondStep } from './SecondStep';
import { postServer } from '@/actions/server/server';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalFormValue {
    name: string;
    description: string;
}

export const MAX_NAME_LENGTH = 10;
export const MAX_DESCRIPTION_LENGTH = 200;

export const CreateServerModal = () => {
    const { push } = useRouter();
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const [step, setStep] = useState(1);

    const isModalOpen = isOpen && type === 'createServer';
    const { appId, header_image } = data;

    const formSchema = z.object({
        name: z
            .string()
            .max(MAX_NAME_LENGTH, { message: `최대 입력 ${MAX_NAME_LENGTH}자 초과` })
            .min(1, { message: `이름을 입력하세요` }),
        description: z
            .string()
            .max(MAX_DESCRIPTION_LENGTH, {
                message: `최대 입력 ${MAX_DESCRIPTION_LENGTH}자 초과`,
            })
            .min(1, { message: `설명을 입력하세요` }),
    });

    const form = useForm<ModalFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { mutateAsync: postMutate } = useMutation({
        mutationFn: postServer,
        onSuccess: async (serverId) => {
            handleClose();
            await queryCache.invalidateQueries({
                queryKey: [API_APP_KEY, { appId: String(appId) }],
            });
            push(`/server/${serverId}`);
        },
    });

    const handleClose = () => {
        reset();
        onClose();
        setStep(1);
    };

    const onValid = async (data: ModalFormValue) => {
        appId && postMutate({ data: { ...data, appId } });
        handleClose();
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
                        서버를 만들어보세요.
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onSubmitError)}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        <div className="relative flex aspect-[460/215] w-full max-w-[230px] gap-2">
                            {header_image && (
                                <Image key={appId} src={header_image} alt="Postimage" fill />
                            )}
                        </div>
                        <FirstStep step={step} onClick={() => setStep(2)} />
                        <SecondStep step={step} onClick={() => setStep(1)} />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
