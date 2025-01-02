'use client';

import { Member } from './Member';
import { UserAvatar } from '@/components/common/UserAvatar';

interface MemberListProps {
    data?: any;
}

export const MemberList = ({ data }: MemberListProps) => {
    return (
        <div className="flex h-full w-full flex-col gap-2 px-2 pt-4">
            <span className="text-sm">온라인</span>
            {data.map(({ user }: any) => (
                <></>
            ))}
        </div>
    );
};
