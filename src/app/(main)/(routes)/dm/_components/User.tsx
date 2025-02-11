import { AddIcon } from '@/components/icons/common/Add.icon';
import { Button } from '@/components/ui/Button';
import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { GradientBg } from '@/components/common/GradientBg';
import { LogoutIcon } from '@/components/icons/common/Logout.icon';
import { MouseEventHandler } from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';

interface UserProps {
    data?: any;
    hasPermission?: boolean;
    postFriend?: MouseEventHandler;
    deleteFriend?: MouseEventHandler;
}

export const User = ({ data, postFriend, deleteFriend }: UserProps) => {
    const { id, name, avatar, friendShipId } = data || {};

    return (
        <div className="flex h-full w-full cursor-pointer flex-col overflow-hidden bg-primary transition-colors">
            <div className="relative flex flex-col">
                <GradientBg id={id} className="h-[96px]" />
                <div className="absolute right-0 top-0 flex gap-1 p-1">
                    <Button
                        size={'iconround'}
                        onClick={!friendShipId ? postFriend : deleteFriend}
                        nameTag="친구추가"
                        className="bg-primary/50 backdrop-blur-lg hover:bg-primary/70"
                    >
                        {!friendShipId ? <AddIcon /> : <DeleteIcon />}
                    </Button>
                </div>
                <div className="absolute -bottom-8 left-2 flex items-center justify-center rounded-full bg-primary p-1">
                    <UserAvatar className="h-16 w-16" src={avatar} />
                </div>
            </div>
            <div className="relative flex flex-1 flex-col overflow-hidden px-4 pb-2 pt-6">
                <span className="ellipsis py-1 hover:underline">{name}</span>
            </div>
        </div>
    );
};
