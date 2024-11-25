import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';

import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { MouseEventHandler } from 'react';
import { Stat2 } from '@/components/icons/common/Stat2.icon';

interface ChannelProps {
    name: any;
    hasPermission: boolean;
    onDelete: MouseEventHandler;
    onEdit: MouseEventHandler;
}

export const ServerDropDown = ({ name, hasPermission, onDelete, onEdit }: ChannelProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-12 w-full">
                <div className="z-50 flex h-full w-full cursor-pointer items-center justify-between border-b border-solid border-b-primary-darker p-4 transition-colors hover:bg-primary-bright">
                    <span>{name}</span>
                    <Stat2 />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent
                    align="start"
                    side="bottom"
                    className="ml-1 min-w-[232px] bg-primary-darker"
                >
                    {hasPermission ? (
                        <>
                            <DropdownMenuItem className="w-full" onClick={onEdit}>
                                <span>서버 프로필 수정</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full" onClick={onDelete}>
                                <span className="text-destructive">서버 삭제</span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuItem className="w-full" onClick={onDelete}>
                            <span className="text-destructive">서버 나가기</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
};
