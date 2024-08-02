import styled from '@emotion/styled';
import DefaultLoading from './DefaultLoading';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 340px;
`;

const CommunityLoading = () => (
    <Container>
        <DefaultLoading />
    </Container>
);

export default CommunityLoading;
