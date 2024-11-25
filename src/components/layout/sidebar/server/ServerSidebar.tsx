'use client';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { Button } from '@/components/ui/Button';
import Channel from './Channel';
import { ServerDropDown } from './ServerDropDown';
import { useModalStore } from '@/store/useModalStore';
import { usePreviewStore } from '@/store/usePreviewStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useUpdateParams } from '@/hooks/useUpdateParams';

export const ServerSidebar = () => {
    const { type, data } = useSidebarStore((state) => state);
    const { name, channels, id, appId, channelId, role, memberId, description } = data;
    const isAdmin = role === 'ADMIN';

    const { onOpen } = useModalStore((state) => state);
    const { isPreview } = usePreviewStore();
    const { updateParams } = useUpdateParams();

    const deleteServer = () => {
        onOpen(isAdmin ? 'deleteServer' : 'leaveServer', { name, serverId: id, appId, memberId });
    };
    const editServer = () => {
        onOpen('editServer', { name, serverId: id, appId, description });
    };

    const createChannel = () => {
        !isPreview && onOpen('createChannel', { serverId: id });
    };
    const deleteChannel = (channelId: string) => {
        onOpen('deleteChannel', { name, channelId, appId, defaultChannelId: channels?.[0].id });
    };
    const editChannel = ({ id, name }: any) => {
        onOpen('editChannel', { name, channelId: id, appId, description });
    };

    if (type !== 'server') {
        return <></>;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <ServerDropDown
                name={name}
                hasPermission={isAdmin}
                onDelete={deleteServer}
                onEdit={editServer}
            />
            <div className="flex flex-col gap-1 px-2 pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs">채팅채널</span>
                    {!isPreview && (
                        <Button
                            size={'iconround'}
                            className="h-4 w-4"
                            variant={'trans'}
                            onClick={createChannel}
                        >
                            <AddIcon className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex flex-col gap-0.5">
                    {channels?.map(
                        (channel) =>
                            channel.type === 'TEXT' && (
                                <Channel
                                    key={id}
                                    data={channel}
                                    isSelected={channel.id === channelId}
                                    onClick={() => updateParams({ channelId: channel.id })}
                                    hasPermission={isAdmin}
                                    onDelete={() => deleteChannel(channel.id)}
                                    onEdit={() => editChannel({ id: channel.id, name })}
                                />
                            ),
                    )}
                </div>
            </div>
        </div>
    );
};
