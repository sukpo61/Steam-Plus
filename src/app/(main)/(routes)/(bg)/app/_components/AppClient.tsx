'use client';

import { getApp } from '@/actions/channel/channel';
import { API_APP_KEY } from '@/actions/queryKeys';
import { useBgStore } from '@/store/useBgStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppParams } from 'types/params/app';
import { AppInfo } from './AppInfo';
import ServerList from './ServerList';

interface AppProps {
    params: AppParams;
}

export const AppClient = ({ params }: AppProps) => {
    const { setBackground } = useBgStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_APP_KEY, params],
        queryFn: () => getApp({ params }),
    });

    const { servers, appDetail, totalCount } = data;

    const { background, steam_appid: appId } = appDetail;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
            <div className="flex w-full max-w-[948px] flex-col items-center gap-1 p-10">
                <AppInfo data={appDetail} />
                <ServerList data={servers} />
            </div>
        </div>
    );
};
