'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Button } from '@/components/ui/Button';
import { deleteChannel } from '@/actions/channel/channel';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUpdateParams } from '@/hooks/useUpdateParams';

export const DeleteChannelModal = () => {
    const { updateParams } = useUpdateParams();
    const { isOpen, onClose, type, data } = useModalStore();
    const queryCache = useQueryClient();

    const isModalOpen = isOpen && type === 'deleteChannel';
    const { channelId, defaultChannelId } = data;

    const { mutateAsync: deleteMutate } = useMutation({
        mutationFn: deleteChannel,
        onSuccess: async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_SERVER_KEY],
            });
            onClose();
            updateParams({ channelId: defaultChannelId });
        },
    });

    const onDelete = () => {
        deleteMutate({ params: { channelId } });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden bg-primary p-0">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-center text-2xl font-bold">채널 삭제</DialogTitle>
                    <div className="flex w-full justify-center">
                        <span className="text-center text-primary-foreground/50">
                            정말 삭제하시겠습니까?
                            <br />
                            메세지들이 영구적으로 삭제됩니다.
                        </span>
                    </div>
                </DialogHeader>
                <div className="flex w-full items-center justify-between bg-primary-bright/50 p-4">
                    <Button onClick={onClose}>취소</Button>
                    <Button variant="destructive" onClick={onDelete}>
                        삭제
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
