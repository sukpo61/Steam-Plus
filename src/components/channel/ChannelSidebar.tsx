'use client';

import styled from '@emotion/styled';

interface ChannelSidebarProps {}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: var(--darkerGrey);
    z-index: 99;
`;

const ChannelSidebar = () => {
    return <div className="flex w-full h-full z-50 bg-primary-dark"></div>;
};

export default ChannelSidebar;
