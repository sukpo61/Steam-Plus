'use client';

import { getMain } from '@/actions/main/main';
import { API_MAIN_KEY } from '@/actions/queryKeys';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppBlock } from './AppBlock';

interface MainClientProps {}

export const MainClient = ({}: MainClientProps) => {
    const { setType } = useSidebarStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_MAIN_KEY],
        queryFn: () => getMain(),
    });

    useEffect(() => {
        setType('friend');
    }, []);

    return (
        <>
            {data.length === 0 ? (
                <div className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary" />
            ) : (
                <>
                    {data.map((app: any) => (
                        <AppBlock data={app} />
                    ))}
                </>
            )}
        </>
    );
};
