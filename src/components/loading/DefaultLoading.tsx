import styled from '@emotion/styled';
import { ClipLoader } from 'react-spinners';

const Container = styled.div`
    display: flex;
`;

const DefaultLoading = () => (
    <Container>
        <ClipLoader size={32} color="#417a9b" />
    </Container>
);

export default DefaultLoading;
