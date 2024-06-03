import styled from '@emotion/styled';
import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import { ColorToken } from 'styles/Color';
import SearchIcon from '@components/icons/navigation/Search.icon';

interface InputStyleProps {
    isBorderRadius?: boolean;
    errorMessage?: string;
}

const Container = styled.div<{ width?: string | number | undefined }>`
    display: flex;
    position: relative;
    max-width: ${({ width }) => `${width}px`};
    width: 100%;
    height: 40px;
`;

const IconContainer = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CusttomInput = styled.input<InputStyleProps>`
    width: 100%;
    height: 100%;
    padding: 0 40px 0 12px;
    background-color: #192030;
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #d4d4d4;
    border-style: none;
    ::placeholder {
        color: #777d87;
    }
    border: ${({ errorMessage }) =>
        errorMessage ? `1px solid red` : `1px solid ${ColorToken.text_primary}`};
    &:focus {
        outline: 'none';
    }
`;

const ErrorText = styled.p`
    color: red;
    margin-top: 10px;
    margin-left: 5px;
`;

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface CusttomInputProps extends InputProps {
    whiteSpace?: boolean;
    errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, CusttomInputProps>(
    (
        { whiteSpace, errorMessage, width = 632, onChange, onSubmit, type = 'text', ...props },
        ref,
    ) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            if (!whiteSpace) {
                e.target.value = e.target.value.replace(/\s/gi, '');
            }
            onChange && onChange(e);
        };

        return (
            <Container width={width}>
                <CusttomInput
                    type={type}
                    onChange={onChangeHandler}
                    errorMessage={errorMessage}
                    {...props}
                    ref={ref}
                />
                <IconContainer>
                    <SearchIcon size={32} />
                </IconContainer>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </Container>
        );
    },
);

Input.displayName = 'Input';

export default Input;

//리팩토링 필요
