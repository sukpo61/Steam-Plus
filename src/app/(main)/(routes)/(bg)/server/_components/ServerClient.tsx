'use client';

import { ServerParams, ServerSearchParams } from 'types/params/server';

import { API_SERVER_KEY } from '@/actions/queryKeys';
import { Channel } from './Channel';
import { Member } from './Member';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { ServerHeader } from '@/components/chat/ServerHeader';
import { getServer } from '@/actions/server/server';
import { postFriend } from '@/actions/friend/friend';
import { useBgStore } from '@/store/useBgStore';
import { useEffect } from 'react';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
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
    const { setBackground } = useBgStore((state) => state);
    const { setType } = useSidebarStore((state) => state);
    const { isPreview, setIsPreview } = usePreviewStore((state) => state);
    const { onOpen } = useModalStore();

    const {
        data: { servers },
    } = useUserStore((state) => state);

    const { data } = useSuspenseQuery({
        queryKey: [API_SERVER_KEY, params],
        queryFn: () => getServer({ params }),
    });

    const { app, members, role } = data;
    const { background, steam_appid: appId } = app;

    const { mutate: postFriendMutate } = useMutation({
        mutationFn: postFriend,
        onSuccess: async () => {},
    });

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background, appId, setBackground]);

    useEffect(() => {
        if (data) setType('server', { ...data, appId, channelId });

        return () => setType('friend');
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
                <div className="flex h-full w-[240px] flex-col gap-2 px-2 pt-4">
                    <span className="text-sm">온라인</span>
                    {members.map((member: any) => {
                        const { id, userId, name } = member;
                        const hasPermission = role === 'ADMIN' && member.role !== 'ADMIN';

                        return (
                            <Member
                                data={member}
                                hasPermission={hasPermission}
                                kickMember={() =>
                                    onOpen('kickMember', {
                                        name,
                                        memberId: id,
                                        serverId,
                                        appId,
                                    })
                                }
                                postFriend={() =>
                                    postFriendMutate({ params: { friendId: userId } })
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
