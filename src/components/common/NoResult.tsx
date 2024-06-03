import styled from '@emotion/styled';
import { FC, PropsWithChildren } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const NoResult: FC<PropsWithChildren> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default NoResult;
