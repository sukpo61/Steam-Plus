import styled from '@emotion/styled';
import { DefaultLoading } from '../common/DefaultLoading';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 340px;
`;

export const CommunityLoading = () => (
    <Container>
        <DefaultLoading />
    </Container>
);
