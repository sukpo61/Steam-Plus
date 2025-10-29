'use client';

import { API_USER_KEY } from '@/actions/queryKeys';
import { getUserInfo } from '@/actions/user/user';
import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

export const UserProviderClient = () => {
    const { setUserData } = useUserStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_USER_KEY],
        queryFn: () => getUserInfo(),
    });

    useEffect(() => {
        setUserData(data);
    }, [data]);

    return <></>;
};
