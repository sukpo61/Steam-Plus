'use client';

import { ServerParams, ServerSearchParams } from 'types/params/server';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Channel } from './Channel';
import { MemberList } from './MemberList';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { ServerHeader } from './ServerHeader';
import { getServer } from '@/actions/server/server';
import { useBgStore } from '@/store/useBgStore';
import { useEffect } from 'react';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useUserStore } from '@/store/useUserStore';

interface ServerProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const ServerClient = ({ params, searchParams }: ServerProps) => {
    const { channelId } = searchParams;
    const { setBackground } = useBgStore((state) => state);
    const { setType } = useSidebarStore((state) => state);
    const {
        data: { id: userId },
    } = useUserStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_SERVER_KEY, params],
        queryFn: () => getServer({ params }),
    });

    const {
        app: { background, steam_appid: appId },
        members,
    } = data;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    useEffect(() => {
        if (data) {
            setType('server', data);
        }
        if (members.map(({ user }: any) => user.id).includes(userId)) {
            console.log('include');
        }
    }, [data]);

    return (
        <div className="flex h-full w-full flex-col">
            <ServerHeader data={data.app} />
            <div className="flex flex-1">
                <div className="flex flex-1">
                    <QuerySuspenseErrorBoundary>
                        {channelId && <Channel params={params} searchParams={searchParams} />}
                    </QuerySuspenseErrorBoundary>
                </div>
                <div className="flex h-full w-[240px]">
                    <MemberList data={members} />
                </div>
            </div>
        </div>
    );
};
