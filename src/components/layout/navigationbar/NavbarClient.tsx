'use client';

import { API_GET_USER_INFO_KEY } from '@/actions/queryKeys';
import { getUserInfo } from '@/actions/user/user';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUserStore } from '@/store/useUserStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { NavSearchButton } from './NavSearchButton';
import { NavServerButtonList } from './NavServerButtonList';

export const NavbarClient = () => {
    const { setUserData } = useUserStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_GET_USER_INFO_KEY],
        queryFn: getUserInfo,
    });

    const { avatar, name, servers } = data;

    useEffect(() => {
        setUserData(data);
    }, [data]);

    return (
        <>
            <UserAvatar src={avatar} className="h-12 w-12" />
            <NavServerButtonList data={servers} />
            <NavSearchButton />
        </>
    );
};
