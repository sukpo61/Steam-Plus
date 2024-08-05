import styled from '@emotion/styled';
import { ColorToken } from 'styles/Color';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const IconWrapper = styled.button`
    width: 100%;
`;

const ContentsSection = styled.section`
    display: flex;
    width: 100%;
    max-width: 768px;
    background: ${ColorToken.icon_background};
    height: 100%;
    min-height: calc(100vh - 45px);
    padding: 45px 30px 0 30px;
    flex-direction: column;
`;

export const PostAddComponents = {
    Layout,
    IconWrapper,
    ContentsSection,
};
