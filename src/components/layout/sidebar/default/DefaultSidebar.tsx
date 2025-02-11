'use client';

import { Button } from '@/components/ui/Button';
import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { Conversations } from './Conversations';
import { FriendIcon } from '@/components/icons/common/Friend.icon';
import { HomeIcon } from '@/components/icons/common/Home.icon';
import { Library } from './Library';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';

const labelData = [
    {
        href: '/',
        icon: <HomeIcon />,
        label: '홈',
    },
    {
        href: '/friend',
        icon: <FriendIcon />,
        label: '친구',
    },
    {
        href: '/community',
        icon: <CommunityIcon />,
        label: '커뮤니티',
    },
];

export const DefaultSidebar = () => {
    const { type } = useSidebarStore((state) => state);
    const { push } = useRouter();
    const pathname = usePathname();

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
                    {labelData.map(({ href, icon, label }) => {
                        const isSelected =
                            href === '/' ? pathname === href : pathname.startsWith(href);
                        return (
                            <Button
                                key={label}
                                variant={'trans'}
                                className="flex h-10 w-full justify-start gap-2 rounded-md p-2"
                                onClick={() => push(href)}
                                selected={isSelected}
                            >
                                {icon}
                                <span>{label}</span>
                            </Button>
                        );
                    })}
                    <div className="flex flex-col">
                        {type === 'friend' ? <Conversations /> : <Library />}
                    </div>
                </div>
            </div>
        </div>
    );
};
