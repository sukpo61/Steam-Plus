import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/PopOver';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { Button } from '@/components/ui/Button';
import { ChatController } from '@/components/chat/ChatController';
import { ChatInput } from '@/components/chat/ChatInput';
import { GradientBg } from '@/components/common/GradientBg';
import { LogoutIcon } from '@/components/icons/common/Logout.icon';
import { MouseEventHandler } from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';

interface MemberProps {
    data: any;
    hasPermission: boolean;
    isMe: boolean;
    onDMSubmit: () => void;
    kickMember: MouseEventHandler;
    postFriend: MouseEventHandler;
}

export const Member = ({
    data,
    kickMember,
    onDMSubmit,
    hasPermission,
    postFriend,
    isMe = false,
}: MemberProps) => {
    const { id, userId, name, avatar, isFriend } = data || {};

    return (
        <Popover>
            <PopoverTrigger>
                <div
                    key={id}
                    className="flex cursor-pointer items-center gap-2 rounded-sm p-1 hover:bg-primary-bright"
                >
                    <UserAvatar src={avatar} />
                    <span>{name}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent
                side="left"
                align="start"
                sideOffset={-40}
                className="border-none bg-transparent shadow-none drop-shadow-none"
            >
                <div className="flex w-[240px] cursor-pointer flex-col overflow-hidden rounded-lg bg-primary transition-colors">
                    <div className="relative flex w-full flex-col">
                        <GradientBg id={id} className="h-[96px]" />
                        <div className="absolute right-0 top-0 flex gap-1 p-1">
                            {!isFriend && (
                                <Button
                                    size={'iconround'}
                                    onClick={postFriend}
                                    className="bg-primary/50 backdrop-blur-lg hover:bg-primary/70"
                                >
                                    <AddIcon />
                                </Button>
                            )}
                            {hasPermission && (
                                <Button
                                    size={'iconround'}
                                    onClick={kickMember}
                                    className="bg-primary/50 backdrop-blur-lg hover:bg-primary/70"
                                >
                                    <LogoutIcon />
                                </Button>
                            )}
                        </div>
                        <div className="absolute -bottom-6 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                            <UserAvatar className="h-10 w-10" src={avatar} />
                        </div>
                    </div>
                    <div className="relative flex flex-1 flex-col overflow-hidden px-4 pb-2 pt-6">
                        <span className="ellipsis py-1 hover:underline">{name}</span>
                        {!isMe && (
                            <ChatController params={{ userId }} onSubmit={onDMSubmit}>
                                <ChatInput
                                    isImageInput={false}
                                    placeholder={`${name}에게 dm보내기`}
                                />
                            </ChatController>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
