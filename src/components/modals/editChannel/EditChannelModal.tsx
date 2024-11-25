'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { SubmitHandler, useForm } from 'react-hook-form';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Button } from '@/components/ui/Button';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { patchChannel } from '@/actions/channel/channel';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalFormValue {
    name: string;
}

export const MAX_NAME_LENGTH = 15;

export const EditChannelModal = () => {
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === 'editChannel';
    const { name, channelId, appId } = data;

    const formSchema = z.object({
        name: z
            .string()
            .max(MAX_NAME_LENGTH, { message: `최대 입력 ${MAX_NAME_LENGTH}자 초과` })
            .min(1, { message: `이름을 입력하세요` }),
    });

    const form = useForm<ModalFormValue>({
        resolver: zodResolver(formSchema),
        values: {
            name: name || '',
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { mutateAsync: patchMutate } = useMutation({
        mutationFn: patchChannel,
        onSuccess: async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_SERVER_KEY],
            });
            handleClose();
        },
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit: SubmitHandler<ModalFormValue> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        patchMutate({ data, params: { channelId } });
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
                        채널을 수정하세요.
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onSubmitError)}
                        className="flex w-full flex-col items-center justify-center"
                    >
                        <section className="flex w-full flex-col gap-2">
                            <span className="pl-1">채널이름</span>
                            <Input {...register('name')} />
                            <div className="mt-2 flex justify-end gap-2">
                                <Button variant="trans" type="button" onClick={onClose}>
                                    취소
                                </Button>
                                <Button variant="primary">수정</Button>
                            </div>
                        </section>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
