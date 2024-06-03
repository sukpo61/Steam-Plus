import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

interface HomeHeaderProps {
    leftArea?: React.ReactNode | string;
    centerArea?: React.ReactNode | string;
    rightArea?: React.ReactNode | string;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    background-color: #404b5e;
    padding: 0 12px;
    width: 100%;
    height: 72px;
`;

const LeftSection = styled.div``;
const CenterSection = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
`;
const RightSection = styled.div``;

export const Header = ({ leftArea, rightArea, centerArea }: HomeHeaderProps) => {
    return (
        <Container>
            <LeftSection>{leftArea}</LeftSection>
            <CenterSection>{centerArea}</CenterSection>
            <RightSection>{rightArea}</RightSection>
        </Container>
    );
};

//리팩토링 필요
