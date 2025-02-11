'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';

import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { EditIcon } from '@/components/icons/common/Edit.icon';
import { Editor } from '../ui/Editor';
import { MessageImageList } from './MessageImageList';
import { Separator } from '@/components/ui/Separator';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

interface MessageProps {
    item: any;
    isDM?: boolean;
    isEdit: boolean;
    isOwned: boolean;
    params: any;
    setEditId: (id: string | null) => void;
    onDelete: (id: string) => void;
    onImageDelete: (id: string) => void;
}

export const Message = ({
    item,
    isDM = false,
    isEdit,
    isOwned,
    params,
    setEditId,
    onDelete,
    onImageDelete,
}: MessageProps) => {
    const { id, content, user, images } = item;

    const { name, avatar } = user || {};

    return (
        <div className="flex w-full flex-col">
            <Separator />
            <div className="flex justify-between">
                <div className="relative flex w-full items-start gap-4 py-3">
                    <UserAvatar className="h-10 w-10" src={avatar} />
                    {isEdit ? (
                        <Editor
                            onCancle={() => setEditId(null)}
                            className={cn(isDM && 'bg-primary')}
                            multiple
                            textMaxHeight={240}
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
                                <MessageImageList
                                    data={images}
                                    isOwned={isOwned}
                                    params={params}
                                    onDelete={onImageDelete}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {!isEdit && isOwned && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <DropDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent align="start" side="top">
                                <DropdownMenuItem onClick={() => setEditId(id)}>
                                    <EditIcon />
                                    <span>수정</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(id)}>
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
