import styled from '@emotion/styled';
import DefaultLoading from './DefaultLoading';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 58px;
    width: 100%;
    margin-bottom: 24px;
`;

const ReplyLoading = () => (
    <Container>
        <DefaultLoading />
    </Container>
);

export default ReplyLoading;
