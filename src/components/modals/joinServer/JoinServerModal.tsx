'use client';

import { API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/Dialog';

import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { joinServer } from '@/actions/server/server';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export interface ModalFormValue {
    name: string;
}

export const MAX_NAME_LENGTH = 15;
export const MAX_DESCRIPTION_LENGTH = 200;

export const JoinServerModal = () => {
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === 'joinServer';
    const { serverId, header_image } = data;

    const { mutate: joinMutate } = useMutation({
        mutationFn: joinServer,
        onSuccess: async () => {
            await queryCache.invalidateQueries({ queryKey: [API_SERVER_KEY, { serverId }] });
            await queryCache.invalidateQueries({ queryKey: [API_USER_KEY] });
            onClose();
        },
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} modal={true}>
            <DialogOverlay />
            <DialogContent className="overflow-hidden bg-primary p-4">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-primary-foreground">
                        서버에 참여하세겠습니까?
                    </DialogTitle>
                </DialogHeader>
                <div className="flex w-full justify-center">
                    <div className="relative flex aspect-[460/215] w-full max-w-[230px] gap-2">
                        {header_image && (
                            <Image key={serverId} src={header_image} alt="Postimage" fill />
                        )}
                    </div>
                </div>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={() => serverId && joinMutate({ params: { serverId } })}>
                    참여
                </Button>
            </DialogContent>
        </Dialog>
    );
};
