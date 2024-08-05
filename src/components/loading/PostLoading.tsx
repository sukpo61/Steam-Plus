import styled from '@emotion/styled';
import DefaultLoading from './DefaultLoading';

const Container = styled.div`
    display: flex;
    background: var(--Gradient-Background);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 948px;
    width: 100%;
    height: 100%;
`;

const PostLoading = () => (
    <Container>
        <DefaultLoading />
    </Container>
);

export default PostLoading;
