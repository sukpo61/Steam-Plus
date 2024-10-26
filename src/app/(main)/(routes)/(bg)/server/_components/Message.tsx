'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { EditIcon } from '@/components/icons/common/Edit.icon';
import { EditInput } from './EditInput';
import { KeyboardEvent } from 'react';
import { Separator } from '@/components/ui/Separator';
import { ServerParams } from 'types/params/server';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useSocket } from '@/provider/SocketProvider';

interface MessageProps {
    item: any;
    params: any;
}

export const Message = ({ item, params }: MessageProps) => {
    const [isOver, setIsOver] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [editState, setEditState] = useState(false);

    const isOpen = useMemo(() => isOver || isClicked, [isOver, isClicked]);

    const { socket } = useSocket();

    const {
        id,
        content,
        member: { user },
    } = item;

    const { name, avatar } = user;

    const deleteHandler = () => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirm) socket.emit('delete', { id });
    };

    const editHandler = () => {
        setEditState(true);
    };

    return (
        <div
            className="flex w-full flex-col"
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            <Separator />
            <div className="flex justify-between">
                <div className="relative flex w-full items-start gap-4 py-3">
                    <UserAvatar className="h-10 w-10" src={avatar} />
                    {editState ? (
                        <EditInput
                            item={item}
                            params={params}
                            closeInput={() => setEditState(false)}
                        />
                    ) : (
                        <div className="flex flex-1 flex-col">
                            <div className="flex gap-1">
                                <span className="text-sm">{name}</span>
                            </div>
                            <div className="flex">
                                <span className="pre-wrap">{content}</span>
                            </div>
                        </div>
                    )}
                </div>
                {!editState && (
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={() => setIsClicked(true)}>
                            <DropDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent align="start" side="top">
                                <DropdownMenuItem onClick={editHandler}>
                                    <EditIcon />
                                    <span>수정</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={deleteHandler}>
                                    <DeleteIcon />
                                    <span>삭제</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};
