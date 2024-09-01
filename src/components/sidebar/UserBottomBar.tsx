'use client';

import { API_GET_USER_INFO_KEY } from '@/actions/queryKeys';
import getUserInfo from '@/actions/user/user';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useSuspenseQuery } from '@tanstack/react-query';

export const UserBottomBar = () => {
    const { data } = useSuspenseQuery({
        queryKey: [API_GET_USER_INFO_KEY],
        queryFn: getUserInfo,
    });

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
