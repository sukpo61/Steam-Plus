import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import React, { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/icons/common/Check.icon';
import { CloseIcon } from '@/components/icons/common/Close.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { Separator } from '@/components/ui/Separator';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface FriendProps {
    data: any;
    onAccept?: MouseEventHandler;
    onCancle?: MouseEventHandler;
    onDelete?: MouseEventHandler;
}

export const Friend = ({ data, onAccept, onCancle, onDelete }: FriendProps) => {
    const { push } = useRouter();

    const { id, status, type, user } = data;
    const { id: userId, name, avatar } = user;

    const isAccept = useMemo(() => status === 'ACCEPTED', [status]);
    const isSend = useMemo(() => type === 'send', [type]);

    const onClickHandler = useCallback(() => isAccept && push(`/dm/${userId}`), [isAccept, userId]);

    return (
        <div
            className="flex w-full cursor-pointer flex-col transition-colors hover:bg-primary-brighter"
            onClick={onClickHandler}
        >
            <Separator className="bg-primary-brighter" />
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <UserAvatar src={avatar} />
                    <div className="flex flex-col">
                        <span className="text-sm">{name}</span>
                        {status === 'PENDING' && (
                            <span className="text-xs text-primary-foreground/50">
                                {type === 'send' ? '보낸요청' : '받은요청'}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isAccept ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-primary/50 hover:bg-primary">
                                <DropDownIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuContent
                                    align="start"
                                    side="bottom"
                                    className="bg-primary-dark"
                                >
                                    <DropdownMenuItem
                                        onClick={onCancle}
                                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                        <span>친구 삭제</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenuPortal>
                        </DropdownMenu>
                    ) : (
                        <>
                            {!isSend && (
                                <Button
                                    variant="iconround"
                                    size="icon"
                                    className="bg-primary hover:bg-primary-dark"
                                    onClick={onAccept}
                                >
                                    <CheckIcon />
                                </Button>
                            )}
                            <Button
                                variant="iconround"
                                size="icon"
                                className="bg-primary hover:bg-primary-dark"
                                onClick={onCancle}
                            >
                                <CloseIcon />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
