'use client';

import styled from '@emotion/styled';
import CommunityIcon from '@components/icons/navigation/Community.icon';
import FriendIcon from '@components/icons/navigation/Friend.icon';
import HomeIcon from '@components/icons/navigation/Home.icon';
import SearchIcon from '@components/icons/navigation/Search.icon';
import VoiceChatIcon from '@components/icons/navigation/VoiceChat.icon';
import NavButton from './NavButton';

interface NavigationSidebarProps {}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
    background: #080c16;
    z-index: 99;
`;

const Profilebutton = styled.div`
    margin: 20px auto 40px;
    border-radius: 50%;
    font-size: 12px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    background: linear-gradient(
        65.45deg,
        #002176 13.13%,
        #002fa8 30.2%,
        #0076b9 52.4%,
        #00b4c7 74.45%,
        #12f8d8 86.79%
    );
    cursor: pointer;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
`;

const navList = [
    {
        title: '홈',
        href: '/',
        icon: HomeIcon,
    },
    {
        title: '게임검색',
        href: '/search',
        icon: SearchIcon,
    },
    {
        title: '커뮤니티',
        href: '/community',
        icon: CommunityIcon,
    },
    {
        title: '친구',
        href: '/',
        icon: FriendIcon,
    },
    {
        title: '화상채팅',
        href: '/channels',
        icon: VoiceChatIcon,
    },
];

const NavigationSidebar = () => {
    return (
        <Container>
            <Profilebutton>
                {true ? 'Login' : <ProfileImg src={'/images/profile/profile.png'} />}
            </Profilebutton>
            {navList.map((item) => (
                <NavButton key={item.title} item={item} />
            ))}
        </Container>
    );
};

export default NavigationSidebar;
