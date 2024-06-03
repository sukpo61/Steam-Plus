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
`;

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            <SidebarContainer>
                <ChannelSidebar />
            </SidebarContainer>
            <Main>{children}</Main>
        </Container>
    );
};

export default ChannelLayout;
