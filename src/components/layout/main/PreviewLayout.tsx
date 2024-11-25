'use client';

import { API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';

import { ReactNode } from 'react';
import { joinServer } from '@/actions/server/server';
import { useMutation } from '@tanstack/react-query';
import { usePreviewStore } from '@/store/usePreviewStore';
import { useQueryClient } from '@tanstack/react-query';

interface bgLayoutProps {
    children: ReactNode;
}

export const PreviewLayout = ({ children }: bgLayoutProps) => {
    const queryCache = useQueryClient();
    const { isPreview, data } = usePreviewStore((state) => state);
    const { serverId } = data || {};

    const { mutate: joinMutate } = useMutation({
        mutationFn: joinServer,
        onSuccess: async () => {
            await queryCache.invalidateQueries({ queryKey: [API_SERVER_KEY, { serverId }] });
            await queryCache.invalidateQueries({ queryKey: [API_USER_KEY] });
        },
    });

    const onClickHandler = () => {
        serverId && joinMutate({ params: { serverId } });
    };

    return (
        <div className="flex h-full w-full basis-0 flex-col">
            {isPreview && (
                <div className="flex h-8 w-full items-center justify-center gap-2 bg-secondary-dark">
                    <span className="text-sm">미리보기 모드입니다.</span>
                    <button
                        className="border-1 rounded-md border border-white/50 px-0.5"
                        type="button"
                        onClick={onClickHandler}
                    >
                        <span className="text-sm">참여하기</span>
                    </button>
                </div>
            )}
            <div className="flex h-full">{children}</div>
            {/* css 보류 */}
        </div>
    );
};
