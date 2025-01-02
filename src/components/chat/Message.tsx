'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { MouseEventHandler, useState } from 'react';

import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { EditController } from './EditController';
import { EditIcon } from '@/components/icons/common/Edit.icon';
import { Editor } from '../ui/Editor';
import { MessageImages } from './MessageImages';
import { Separator } from '@/components/ui/Separator';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

interface MessageProps {
    item: any;
    isDM?: boolean;
    isOwned: boolean;
    params: any;
    onDelete: MouseEventHandler;
}

export const Message = ({ item, isDM = false, isOwned, params, onDelete }: MessageProps) => {
    const [editState, setEditState] = useState(false);

    const { content, user, images } = item;

    const { name, avatar } = user || {};

    return (
        <div className="flex w-full flex-col">
            <Separator />
            <div className="flex justify-between">
                <div className="relative flex w-full items-start gap-4 py-3">
                    <UserAvatar className="h-10 w-10" src={avatar} />
                    {editState ? (
                        <EditController
                            item={item}
                            defaultValues={item}
                            closeInput={() => setEditState(false)}
                            isDM={isDM}
                        >
                            <Editor
                                cancle={() => setEditState(false)}
                                className={cn(isDM && 'bg-primary')}
                                textMaxHeight={240}
                            />
                        </EditController>
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
                                    <MessageImages
                                        key={image.id}
                                        data={image}
                                        imageOnly={content}
                                        params={params}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {!editState && isOwned && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <DropDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent align="start" side="top">
                                <DropdownMenuItem onClick={() => setEditState(true)}>
                                    <EditIcon />
                                    <span>수정</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onDelete}>
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
