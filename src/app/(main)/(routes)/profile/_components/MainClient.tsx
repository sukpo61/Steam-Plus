'use client';

import { API_MAIN_KEY } from '@/actions/queryKeys';
import { AppBlock } from './AppBlock';
import { getMain } from '@/actions/main/main';
import { useEffect } from 'react';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSuspenseQuery } from '@tanstack/react-query';

interface MainClientProps {}

export const MainClient = ({}: MainClientProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_MAIN_KEY],
        queryFn: () => getMain(),
    });

    return (
        <>
            {data.length === 0 ? (
                <div className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary" />
            ) : (
                <>
                    {data.map((app: any) => (
                        <AppBlock key={app.id} data={app} />
                    ))}
                </>
            )}
        </>
    );
};
