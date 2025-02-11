'use client';

import { API_APP_KEY, API_MAIN_KEY, API_SERVER_KEY, API_USER_KEY } from '@/actions/queryKeys';

import { Member } from './Member';
import { ServerParams } from 'types/params/server';
import { kickMember } from '@/actions/server/server';
import { postFriend } from '@/actions/friend/friend';
import { useModalStore } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

interface MemberListProps {
    params: ServerParams;
    data?: any;
}

export const MemberList = ({ params, data }: MemberListProps) => {
    const { serverId } = params;
    const { push } = useRouter();
    const { onOpen } = useModalStore();
    const {
        data: { id: myUserId },
    } = useUserStore();
    const queryCaches = useQueryClient();

    const { app, members = [], role } = data || {};
    const { steam_appid: appId } = app || {};

    const { mutateAsync: leaveMutate } = useMutation({
        mutationFn: kickMember,
        onSuccess: async () => {
            await queryCaches.invalidateQueries({
                queryKey: [API_MAIN_KEY],
            });
            await queryCaches.invalidateQueries({
                queryKey: [API_USER_KEY],
            });
            await queryCaches.invalidateQueries({
                queryKey: [API_APP_KEY, { appId }],
            });
            queryCaches.invalidateQueries({
                queryKey: [API_SERVER_KEY, { serverId }],
            });
        },
    });

    const { mutate: postFriendMutate } = useMutation({
        mutationFn: postFriend,
        onSuccess: async () => {},
    });

    return (
        <div className="flex h-full w-full flex-col gap-2 px-2 pt-4">
            <span className="text-sm">온라인</span>
            {members.map((member: any) => {
                const { id: memberId, userId, name, role: memberRole } = member;
                const hasPermission = role === 'ADMIN' && memberRole !== 'ADMIN';
                const kickMember = () =>
                    onOpen('kickMember', {
                        name,
                        onConfirm: () => leaveMutate({ params: { memberId } }),
                    });
                const onDMSubmit = () => push(`/dm/${userId}`);
                return (
                    <Member
                        data={member}
                        hasPermission={hasPermission}
                        isMe={userId === myUserId}
                        onDMSubmit={onDMSubmit}
                        kickMember={kickMember}
                        postFriend={() => postFriendMutate({ params: { friendId: userId } })}
                    />
                );
            })}
        </div>
    );
};
