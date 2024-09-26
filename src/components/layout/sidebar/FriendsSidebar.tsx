'use client';

import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LibrarySidebar } from './LibrarySidebar';

const Library = () => {
    return (
        <div className="flex w-full flex-col">
            <span>라이브러</span>
        </div>
    );
};
const FriendList = () => {};

export const FriendsSidebar = () => {
    const { type, data } = useSidebarStore((state) => state);
    const { push } = useRouter();
    const [state, setState] = useState(true);

    if (type !== 'friend') {
        return;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div className="w-full p-2">
                <div
                    className="flex h-7 cursor-pointer items-center rounded-sm bg-primary-dark px-2"
                    onClick={() => {}}
                >
                    <span className="text-sm">대화 찾기</span>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col p-2">
                <Button
                    variant={'trans'}
                    className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                    onClick={() => push('/community')}
                >
                    <CommunityIcon />
                    <span>커뮤니티</span>
                </Button>
                <Button
                    variant={'trans'}
                    className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                    onClick={() => setState((e) => !e)}
                >
                    {state ? (
                        <>
                            <CommunityIcon />
                            <span>친구목록</span>
                        </>
                    ) : (
                        <>
                            <CommunityIcon />
                            <span>라이브러리</span>
                        </>
                    )}
                </Button>
                {state ? <LibrarySidebar /> : <div></div>}
            </div>
        </div>
    );
};
