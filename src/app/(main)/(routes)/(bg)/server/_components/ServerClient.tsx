'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Channel } from './Channel';
import { ServerHeader } from './ServerHeader';
import { ServerParams } from 'types/params/server';
import { UserAvatar } from '@/components/common/UserAvatar';
import { UserList } from './UserList';
import { getServer } from '@/actions/server/server';
import { useBgStore } from '@/store/useBgStore';
import { useEffect } from 'react';
import { useSidebarStore } from '@/store/useSidebarStore';

interface ServerProps {
    params: ServerParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const ServerClient = ({ params }: ServerProps) => {
    const { serverId } = params;
    const { setBackground } = useBgStore((state) => state);
    const { setType } = useSidebarStore((state) => state);

    const queryCache = useQueryClient();

    const { data } = useSuspenseQuery({
        queryKey: [API_SERVER_KEY, params],
        queryFn: () => getServer({ params }),
    });

    const {
        app: { background, steam_appid: appId },
    } = data;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    useEffect(() => {
        setType('server');
    }, []);

    return (
        <div className="flex h-full w-full flex-col">
            <ServerHeader data={data.app} />
            <div className="flex flex-1">
                <div className="flex flex-1">
                    <Channel />
                </div>
                <div className="flex h-full w-[240px]">
                    <UserList />
                </div>
            </div>
        </div>
    );
};
