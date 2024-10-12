'use client';

import { UserAvatar } from '@/components/common/UserAvatar';

interface UserListProps {
    data?: any;
}

export const UserList = ({ data }: UserListProps) => {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-2 pt-4">
            <span className="text-sm">오프라인</span>
            <div className="flex items-center gap-2">
                <UserAvatar />
                <span>유저네임</span>
            </div>
            <div className="flex items-center gap-2">
                <UserAvatar />
                <span>유저네임</span>
            </div>
            <div className="flex items-center gap-2">
                <UserAvatar />
                <span>유저네임</span>
            </div>
        </div>
    );
};
