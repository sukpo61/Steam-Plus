import styled from '@emotion/styled';

const Container = styled.div``;
const Main = styled.div``;
const NavigationSidebarContainer = styled.div``;
const NavigationSidebar = styled.main``;

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            <NavigationSidebarContainer>
                <NavigationSidebar />
            </NavigationSidebarContainer>
            <Main>{children}</Main>
        </Container>
    );
};

export default MainLayout;
