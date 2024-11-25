'use client';

import { API_APP_KEY, API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { patchServer, postServer } from '@/actions/server/server';

import { Button } from '@/components/ui/Button';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalFormValue {
    name: string;
    description: string;
}

export const MAX_NAME_LENGTH = 10;
export const MAX_DESCRIPTION_LENGTH = 200;

export const EditServerModal = () => {
    const { push } = useRouter();
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);

    const isModalOpen = isOpen && type === 'editServer';
    const { name, description, serverId, appId } = data;

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
        values: {
            name: name || '',
            description: description || '',
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const { mutateAsync: patchMutate } = useMutation({
        mutationFn: patchServer,
        onSuccess: async () => {
            handleClose();
            await queryCache.invalidateQueries({
                queryKey: [API_APP_KEY, { appId: String(appId) }],
            });
            await queryCache.invalidateQueries({ queryKey: [API_USER_KEY] });
            await queryCache.invalidateQueries({ queryKey: [API_SERVER_KEY, { serverId }] });
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
        serverId && patchMutate({ data, params: { serverId } });
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
                        서버 프로필 편집.
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onSubmitError)}
                        className="flex w-full flex-col items-center justify-center gap-4"
                    >
                        <section className="flex w-full flex-col gap-2">
                            <span className="pl-1">서버이름</span>
                            <Input {...register('name')} />
                        </section>
                        <section className="flex w-full flex-col gap-2">
                            <span className="pl-1">서버설명</span>
                            <TextArea
                                {...register('description')}
                                maxHeight={64}
                                className="rounded-md bg-primary-dark p-2"
                            />
                            <div className="mt-2 flex justify-end gap-2">
                                <Button variant="trans" type="button" onClick={onClose}>
                                    취소
                                </Button>
                                <Button variant="primary">생성</Button>
                            </div>
                        </section>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
