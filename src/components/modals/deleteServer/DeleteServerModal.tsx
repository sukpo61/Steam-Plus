'use client';

import { API_APP_KEY, API_MAIN_KEY, API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { deleteServer } from '@/actions/server/server';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalFormValue {
    name: string;
}

export const MAX_NAME_LENGTH = 15;

export const DeleteServerModal = () => {
    const { push } = useRouter();
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const { serverId, appId, name } = data;

    const isModalOpen = isOpen && type === 'deleteServer';

    const formSchema = z.object({
        name: z.string().refine((val) => val === name, { message: '이름이 일치하지 않습니다.' }),
    });

    const form = useForm<ModalFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const { reset, register, handleSubmit } = form;

    const { mutateAsync: deleteMutate } = useMutation({
        mutationFn: deleteServer,
        onSuccess: async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_MAIN_KEY],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_USER_KEY],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_APP_KEY, { appId }],
            });
            queryCache.removeQueries({
                queryKey: [API_SERVER_KEY, { serverId }],
            });
            handleClose();
            push('/');
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
        serverId && deleteMutate({ params: { serverId } });
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
                        {`'${name}' 서버를 삭제`}{' '}
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onSubmitError)}
                        className="flex w-full flex-col items-start"
                    >
                        <span className="mb-1 ml-1">서버이름을 입력하세요.</span>
                        <Input {...register('name')} className="mb-4" />
                        <div className="flex w-full justify-end gap-2 px-1">
                            <Button variant="trans" type="button" onClick={handleClose}>
                                취소
                            </Button>
                            <Button variant="destructive">확인</Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
