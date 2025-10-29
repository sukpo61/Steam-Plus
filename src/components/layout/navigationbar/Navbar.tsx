'use client';

import { NavSearchButton } from './NavSearchButton';
import { NavServerButton } from './NavServerButton';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUserStore } from '@/store/useUserStore';

export const Navbar = () => {
    const { data } = useUserStore((state) => state);

    const { avatar, name, servers } = data;

    return (
        <div
            className="relative flex h-full w-full flex-col items-center gap-4 overflow-x-visible overflow-y-scroll bg-primary-darkest pt-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            <UserAvatar src={avatar} className="h-12 w-12 flex-shrink-0" />
            {servers?.map((server: any) => <NavServerButton key={server.id} data={server} />)}
            <NavSearchButton />
        </div>
    );
};
