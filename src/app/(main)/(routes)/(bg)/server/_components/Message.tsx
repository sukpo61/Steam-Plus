'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { ServerParams, ServerSearchParams } from 'types/params/server';
import { useMemo, useState } from 'react';

import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { EditIcon } from '@/components/icons/common/Edit.icon';
import { EditInput } from './EditInput';
import { MessageImage } from './MessageImages';
import { Separator } from '@/components/ui/Separator';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useSocket } from '@/provider/SocketProvider';
import { useUserStore } from '@/store/useUserStore';

interface MessageProps {
    item: any;
    params: ServerParams;
    searchParams: ServerSearchParams;
}

export const Message = ({ item, params, searchParams }: MessageProps) => {
    const [isOver, setIsOver] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [editState, setEditState] = useState(false);
    const {
        data: { id: userId },
    } = useUserStore();

    const isOpen = useMemo(() => isOver || isClicked, [isOver, isClicked]);

    const { socket } = useSocket();

    const {
        id,
        content,
        member: { user },
        images,
    } = item;

    const { id: messageUserId, name, avatar } = user;

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
                            <div className="flex gap-1">
                                {images?.map((image: any) => (
                                    <MessageImage
                                        key={image.id}
                                        data={image}
                                        imageOnly={content}
                                        searchParams={searchParams}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {!editState && (
                    <>
                        {userId === messageUserId && (
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
                    </>
                )}
            </div>
        </div>
    );
};
