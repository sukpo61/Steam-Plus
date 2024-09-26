'use client';

import { UserAvatar } from '@/components/common/UserAvatar';
import { useUserStore } from '@/store/useUserStore';

export const UserBottomBar = () => {
    const { data } = useUserStore((state) => state);
    const { avatar, name } = data;

    return (
        <div className="flex h-14 w-full items-center gap-2 bg-primary-darkest/50 p-2">
            <div className="flex h-full flex-1 cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-primary-bright">
                <UserAvatar src={avatar} />
                <span>{name}</span>
            </div>
        </div>
    );
};
