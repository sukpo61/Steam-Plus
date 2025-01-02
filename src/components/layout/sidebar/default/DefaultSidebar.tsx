'use client';

import { Button } from '@/components/ui/Button';
import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { Conversations } from './Conversations';
import { FriendIcon } from '@/components/icons/common/Friend.icon';
import { HomeIcon } from '@/components/icons/common/Home.icon';
import { Library } from './Library';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';

export const DefaultSidebar = () => {
    const { type, data } = useSidebarStore((state) => state);
    const { push } = useRouter();

    if (!(type === 'friend' || type === 'library')) {
        return;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div
                className="z-50 flex h-12 w-full cursor-pointer items-center justify-between border-b border-solid border-b-primary-darker p-4 transition-colors hover:bg-primary-bright/50"
                onClick={() => {}}
            >
                <span className="text-sm">대화 찾기</span>
            </div>
            <div className="flex h-full w-full flex-col pr-0.5">
                <div className="thumb-sm flex flex-1 basis-0 flex-col overflow-y-scroll py-2 pl-2 pr-1">
                    <Button
                        variant={'trans'}
                        className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                        onClick={() => {
                            push('/');
                        }}
                    >
                        <HomeIcon />
                        <span>홈</span>
                    </Button>
                    <Button
                        variant={'trans'}
                        className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                        onClick={() => {
                            push('/friend');
                        }}
                    >
                        <FriendIcon />
                        <span>친구목록</span>
                    </Button>
                    <Button
                        variant={'trans'}
                        className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                        onClick={() => push('/community')}
                    >
                        <CommunityIcon />
                        <span>커뮤니티</span>
                    </Button>
                    <div className="flex flex-col">
                        {type === 'friend' ? <Conversations /> : <Library />}
                    </div>
                </div>
            </div>
        </div>
    );
};
