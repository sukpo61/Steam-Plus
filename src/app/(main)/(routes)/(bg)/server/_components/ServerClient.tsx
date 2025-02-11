'use client';

import { ServerParams, ServerSearchParams } from 'types/params/server';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Channel } from './Channel';
import { MemberList } from './MemberList';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { ServerHeader } from '@/components/chat/ServerHeader';
import { getServer } from '@/actions/server/server';
import { useBgStore } from '@/store/useBgStore';
import { useEffect } from 'react';
import { usePreviewStore } from '@/store/usePreviewStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
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
    const { serverId } = params;
    const { channelId } = searchParams;
    const { setBackground } = useBgStore();
    const { setType } = useSidebarStore();
    const { isPreview, setIsPreview } = usePreviewStore();

    const {
        data: { servers },
    } = useUserStore();

    const { data } = useSuspenseQuery({
        queryKey: [API_SERVER_KEY, params],
        queryFn: () => getServer({ params }),
    });

    const { app } = data;
    const { background, steam_appid: appId } = app;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background, appId, setBackground]);

    useEffect(() => {
        if (data) setType('server', { ...data, appId, channelId });
    }, [data, setType, channelId]);

    useEffect(() => {
        if (!servers || !serverId) return;
        setIsPreview(!servers.some((server: any) => server.id === serverId), { serverId });

        return () => setIsPreview(false);
    }, [servers, serverId]);

    return (
        <div className="flex h-full w-full flex-col">
            <ServerHeader data={app} />
            <div className="flex flex-1">
                <div className="flex flex-1">
                    <QuerySuspenseErrorBoundary>
                        {channelId && (
                            <Channel
                                params={params}
                                searchParams={searchParams}
                                isPreview={isPreview}
                            />
                        )}
                    </QuerySuspenseErrorBoundary>
                </div>
                <div className="flex h-full w-[240px] flex-col">
                    <MemberList data={data} params={params} />
                </div>
            </div>
        </div>
    );
};
