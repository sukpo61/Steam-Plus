'use client';

import styled from '@emotion/styled';
import NavigationSidebar from '@components/navigation/NavigationSidebar';
import { RecoilRoot } from 'recoil';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const SidebarContainer = styled.div`
    display: flex;
    width: 72px;
`;
const Main = styled.main`
    flex: 1;
`;

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <Container>
                <SidebarContainer>
                    <NavigationSidebar />
                </SidebarContainer>
                <Main>{children}</Main>
            </Container>
        </RecoilRoot>
    );
};

export default NavigationLayout;
