'use client';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { Button } from '@/components/ui/Button';
import { useModalStore } from '@/store/useModalStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useUpdateParams } from '@/hooks/useUpdateParams';

export const ServerSidebar = () => {
    const { type, data } = useSidebarStore((state) => state);
    const { name, channels, id } = data;

    const { onOpen } = useModalStore((state) => state);

    const { updateParams } = useUpdateParams();

    if (type !== 'server') {
        return <></>;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div className="z-50 flex h-12 w-full items-center border-b border-solid border-b-primary-darker p-4">
                <span>{name}</span>
            </div>
            <div className="flex flex-col gap-1 px-2 pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs">채팅채널</span>
                    <Button
                        size={'iconround'}
                        className="h-4 w-4"
                        variant={'trans'}
                        onClick={() => onOpen('createChannel', { serverId: id })}
                    >
                        <AddIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-col">
                    {channels?.map(
                        ({ id, name, type }) =>
                            type === 'TEXT' && (
                                <div
                                    key={id}
                                    className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1 transition-colors hover:bg-primary-bright"
                                    onClick={() => updateParams({ channelId: id })}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <span className="text-xl">#</span>
                                        <span className="text-sm">{name}</span>
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
};
