'use client';

import { API_APP_KEY } from '@/actions/queryKeys';
import { AppHeader } from './AppHeader';
import { AppInfo } from './AppInfo';
import { AppParams } from 'types/params/app';
import { ObserverTrigger } from '@/components/hoc/ObserverTrigger';
import ServerList from './ServerList';
import { getApp } from '@/actions/app/app';
import { useBgStore } from '@/store/useBgStore';
import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

interface AppProps {
    params: AppParams;
}

export const AppClient = ({ params }: AppProps) => {
    const { setBackground } = useBgStore((state) => state);
    const isBreak = useMediaQuery(1148);

    const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
        queryKey: [API_APP_KEY, params],
        queryFn: ({ pageParam: cursor }) => getApp({ params, cursor }),
        initialPageParam: null,
        getNextPageParam: ({ nextCursor }) => {
            return nextCursor ?? null;
        },
    });

    const onObserve = () => {
        hasNextPage && fetchNextPage();
    };

    const serversData = data.pages;

    const appDetail = serversData[0].appDetail;

    const { background, steam_appid: appId } = appDetail;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    return (
        <>
            {isBreak ? <AppInfo data={appDetail} /> : <AppHeader data={appDetail} />}
            <ObserverTrigger onObserve={onObserve}>
                <ServerList data={serversData} />
            </ObserverTrigger>
        </>
    );
};
