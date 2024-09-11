'use client';

import { postServer } from '@/actions/server/server';
import { Button } from '@/components/ui/Button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface ModalFormValue {
    name: string;
}

export const CreateChannelModal = () => {
    const { push } = useRouter();
    const { isOpen, onClose, type, data } = useModalStore();

    const isModalOpen = isOpen && type === 'createChannel';
    const { appId } = data;

    const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ModalFormValue>({
        defaultValues: {
            name: '',
        },
    });

    const { mutateAsync: postMutate } = useMutation({
        mutationFn: postServer,
        onSuccess: async (serverId) => {
            handleClose();
            push(`/server/${serverId}`);
        },
    });

    const onSubmit: SubmitHandler<ModalFormValue> = async (data) => {
        appId && postMutate({ data: { ...data, appId } });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden bg-primary p-4">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-center text-2xl font-bold text-primary-foreground">
                        Create Server
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('name')} />
                    <DialogFooter className="bg-primary px-6 py-4">
                        <Button variant="primary" disabled={isSubmitting}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
