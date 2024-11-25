'use client';

import { API_APP_KEY, API_MAIN_KEY, API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { kickMember, leaveServer } from '@/actions/server/server';

import { Button } from '@/components/ui/Button';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface ModalFormValue {
    name: string;
}

export const MAX_NAME_LENGTH = 15;

export const LeaveServerModal = () => {
    const { replace } = useRouter();
    const queryCache = useQueryClient();
    const { isOpen, onClose, type, data } = useModalStore((state) => state);
    const { serverId, memberId, appId, name } = data;

    const isModalOpen = isOpen && (type === 'leaveServer' || type === 'kickMember');

    const { mutateAsync: leaveMutate } = useMutation({
        mutationFn: kickMember,
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
            queryCache.invalidateQueries({
                queryKey: [API_SERVER_KEY, { serverId }],
            });
            onClose();
            type === 'leaveServer' && replace('/');
        },
    });

    const onClickHandler = () => {
        memberId && leaveMutate({ params: { memberId } });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden bg-primary p-4">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-primary-foreground">
                        {type === 'leaveServer' ? (
                            <>{`'${name}' 서버를 떠나시겠습니까?`}</>
                        ) : (
                            <>{`'${name}'를 내보내시겠습니까?`}</>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex w-full justify-end gap-2">
                    <Button variant="trans" type="button" onClick={onClose}>
                        취소
                    </Button>
                    <Button variant="destructive" onClick={onClickHandler}>
                        확인
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
