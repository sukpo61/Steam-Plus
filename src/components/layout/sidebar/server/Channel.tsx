import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/ContextMenu';

import { MouseEventHandler } from 'react';
import { cn } from '@/lib/utils';

interface ChannelProps {
    data: any;
    isSelected: boolean;
    onClick: MouseEventHandler;
    hasPermission: boolean;
    onDelete: MouseEventHandler;
    onEdit: MouseEventHandler;
}

const Channel = ({ data, isSelected, onClick, hasPermission, onEdit, onDelete }: ChannelProps) => {
    const { name, isDefault } = data;
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className={cn(
                        'flex cursor-pointer items-center justify-between rounded-md px-2 py-0.5 transition-colors hover:bg-primary-bright',
                        isSelected && 'bg-primary-bright/50',
                    )}
                    onClick={onClick}
                >
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-xl">#</span>
                        <span className="text-sm">{name}</span>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuPortal>
                <ContextMenuContent>
                    <ContextMenuItem>
                        <span>초대하기</span>
                    </ContextMenuItem>
                    {hasPermission && (
                        <>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={onEdit}>
                                <span>수정하기</span>
                            </ContextMenuItem>
                            {!isDefault && (
                                <ContextMenuItem onClick={onDelete}>
                                    <span className="text-destructive">삭제하기</span>
                                </ContextMenuItem>
                            )}
                        </>
                    )}
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    );
};

export default Channel;
