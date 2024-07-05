'use client';

import styled from '@emotion/styled';
import ChannelSidebar from '@components/channel/ChannelSidebar';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const SidebarContainer = styled.div`
    display: flex;
    width: 320px;
`;

const Main = styled.main`
    flex: 1;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('https://shared.steamstatic.com/store_item_assets/steam/apps/960990/page_bg_generated_v6b.jpg?t=1667468566');
`;

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            <SidebarContainer>
                <ChannelSidebar />
            </SidebarContainer>
            <Main className="background">{children}</Main>
        </Container>
    );
};

export default ChannelLayout;
