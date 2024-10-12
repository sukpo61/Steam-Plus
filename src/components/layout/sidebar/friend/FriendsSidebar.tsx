'use client';

import { Button } from '@/components/ui/Button';
import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { LibrarySidebar } from './LibrarySidebar';
import { Separator } from '@/components/ui/Separator';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useState } from 'react';

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
        <div className="flex h-full w-full flex-col pr-0.5">
            <div className="w-full p-2">
                <div
                    className="flex h-7 cursor-pointer items-center rounded-sm bg-primary-dark px-2"
                    onClick={() => {}}
                >
                    <span className="text-sm">대화 찾기</span>
                </div>
            </div>
            <Separator className="bg-primary-dark" />
            <div className="thumb-sm flex flex-1 basis-0 flex-col overflow-y-scroll py-2 pl-2 pr-1">
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
                <div className="flex flex-col">{state ? <LibrarySidebar /> : <div></div>}</div>
            </div>
        </div>
    );
};
