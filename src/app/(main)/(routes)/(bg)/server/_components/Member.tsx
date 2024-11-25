import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/ContextMenu';

import { MouseEventHandler } from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useModalStore } from '@/store/useModalStore';

interface MemberProps {
    data: any;
    hasPermission: boolean;
    kickMember: MouseEventHandler;
}

export const Member = ({ data, kickMember, hasPermission }: MemberProps) => {
    const { id, name, avatar, role, serverId } = data || {};

    const { onOpen } = useModalStore();
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div
                        key={id}
                        className="flex cursor-pointer items-center gap-2 rounded-sm p-1 hover:bg-primary-bright"
                    >
                        <UserAvatar src={avatar} />
                        <span>{name}</span>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuPortal>
                    {hasPermission && (
                        <ContextMenuContent>
                            <ContextMenuItem onClick={kickMember}>
                                <span className="text-destructive">내보내기</span>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    )}
                </ContextMenuPortal>
            </ContextMenu>
        </>
    );
};
