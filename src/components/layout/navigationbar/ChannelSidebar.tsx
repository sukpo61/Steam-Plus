'use client';

import { CommunityIcon } from '@/components/icons/navigation/Community.icon';
import { FriendIcon } from '@/components/icons/navigation/Friend.icon';
import { HomeIcon } from '@/components/icons/navigation/Home.icon';
import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { VoiceChatIcon } from '@/components/icons/navigation/VoiceChat.icon';
import { UserAvatar } from '../../common/UserAvatar';
import { NavButton } from './NavButton';

interface NavigationSidebarProps {}

const navList = [
    {
        title: '홈',
        href: '/',
        rex: /^\/$/,
        icon: HomeIcon,
    },
    {
        title: '게임검색',
        href: '/search',
        rex: /^\/search/,
        icon: SearchIcon,
    },
    {
        title: '커뮤니티',
        href: '/community?category=all&page=1',
        rex: /^\/community/,
        icon: CommunityIcon,
    },
    {
        title: '친구',
        href: '/friend',
        rex: /^\/friend/,
        icon: FriendIcon,
    },
    {
        title: '화상채팅',
        href: '/signin',
        rex: /^\/channels/,
        icon: VoiceChatIcon,
    },
];

const ChannelSidebar = () => {
    return (
        <div className="flex h-full w-full flex-col items-center gap-4 bg-primary-darkest pt-4">
            <UserAvatar className="h-12 w-12" />
            {navList.map((item) => (
                <NavButton key={item.title} item={item} />
            ))}
        </div>
    );
};

export default ChannelSidebar;
