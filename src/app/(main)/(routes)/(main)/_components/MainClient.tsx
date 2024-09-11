'use client';

import { getMain } from '@/actions/main/main';
import { API_MAIN_KEY } from '@/actions/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ServerBlock } from './ServerBlock';

interface MainClientProps {}

export const MainClient = ({}: MainClientProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_MAIN_KEY],
        queryFn: () => getMain(),
    });

    useEffect(() => {
        console.log('maindata', data);
    }, [data]);

    return (
        <>
            {data.length === 0 ? (
                <div className="flex h-10 w-full items-center justify-center">
                    <span>검색결과가 없습니다.</span>
                </div>
            ) : (
                <div className="3xl:grid-cols-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {data.map((app: any) => (
                        <ServerBlock data={app} />
                    ))}
                </div>
            )}
        </>
    );
};
