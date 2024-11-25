'use client';

import { API_USER_KEY } from '@/actions/queryKeys';
import { NavSearchButton } from './NavSearchButton';
import { NavServerButton } from './NavServerButton';
import { UserAvatar } from '@/components/common/UserAvatar';
import { getUserInfo } from '@/actions/user/user';
import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

export const NavbarClient = () => {
    const { setUserData } = useUserStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_USER_KEY],
        queryFn: getUserInfo,
    });

    const { avatar, name, servers } = data;

    useEffect(() => {
        setUserData(data);
    }, [data]);

    return (
        <>
            <UserAvatar src={avatar} className="h-12 w-12 flex-shrink-0" />
            {servers.map((server: any) => (
                <NavServerButton key={server.id} data={server} />
            ))}
            <NavSearchButton />
        </>
    );
};
