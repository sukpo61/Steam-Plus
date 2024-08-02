import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import { FC, ReactEventHandler } from 'react';
import { Button } from '@components/ui/Button';

interface DefaultErrorProps {
    onClick: ReactEventHandler<HTMLButtonElement>;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const DefaultError: FC<DefaultErrorProps> = ({ onClick }) => {
    return (
        <Container>
            <Text text={`죄송합니다. 에러가 발생했습니다. \n 재시도 버튼을 눌러주세요.`} preLine />
            <Button text="재시도" onClick={onClick} />
        </Container>
    );
};

export default DefaultError;
