'use client';

import { UserAvatar } from '@/components/common/UserAvatar';

interface MemberListProps {
    data?: any;
}

export const MemberList = ({ data }: MemberListProps) => {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-2 pt-4">
            <span className="text-sm">온라인</span>
            {data.map(({ user: { id, name, avatar } }: any) => (
                <div key={id} className="flex items-center gap-2">
                    <UserAvatar src={avatar} />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
};
