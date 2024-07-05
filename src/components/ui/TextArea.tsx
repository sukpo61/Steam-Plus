import styled from '@emotion/styled';
import {
    ChangeEvent,
    FormEvent,
    forwardRef,
    TextareaHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ColorToken } from 'styles/Color';
import { Text } from './Text';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    width?: string;
    margin?: string;
}

const Container = styled.div<{ width: string; margin?: string }>`
    width: ${({ width }) => width};
    margin: ${({ margin }) => margin};
`;

const TextAreaInput = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 12px 40px 0 12px;
    background-color: #263245;
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #d4d4d4;
    border-style: none;
    resize: none;
    ::placeholder {
        color: #777d87;
    }
    &:focus {
        outline: none;
    }
`;

const LengthTextBox = styled.div`
    text-align: right;
`;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ maxLength, onChange, onInput, width = '100%', margin, ...textareaAttributes }, ref) => {
        const inputRef = useRef<HTMLTextAreaElement | null>(null);
        const [length, setLength] = useState<number>(0);

        // 텍스트 변경 시 길이 업데이트 및 onChange 이벤트 처리
        const handleTextareaChange = useCallback<(event: ChangeEvent<HTMLTextAreaElement>) => void>(
            (event) => {
                setLength(event.currentTarget.value.length);
                onChange?.(event);
            },
            [onChange],
        );

        // ref 조합 함수
        const combineRef = useCallback(
            (instance: HTMLTextAreaElement | null) => {
                if (typeof ref === 'function') {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
                inputRef.current = instance;
            },
            [ref],
        );

        // 텍스트 입력 시 maxLength 제한 및 onInput 이벤트 처리
        const handleTextareaInput = useCallback<(event: FormEvent<HTMLTextAreaElement>) => void>(
            (event) => {
                const target = event.currentTarget.value;
                if (maxLength && target.length > maxLength) {
                    event.currentTarget.value = target.slice(0, maxLength);
                }
                onInput?.(event);
            },
            [maxLength, onInput],
        );

        // 초기 렌더링 시 길이 설정
        useEffect(() => {
            if (inputRef.current && inputRef.current.value) {
                setLength(inputRef.current.value.length);
            }
        }, []);

        return (
            <Container width={width} margin={margin}>
                <TextAreaInput
                    ref={combineRef}
                    maxLength={maxLength}
                    onChange={handleTextareaChange}
                    onInput={handleTextareaInput}
                    {...textareaAttributes}
                />
                {maxLength && (
                    <LengthTextBox>
                        <Text
                            text={`${length.toLocaleString()}/${maxLength.toLocaleString()} 자`}
                            color={ColorToken.text_primary}
                            size={15}
                        />
                    </LengthTextBox>
                )}
            </Container>
        );
    },
);

TextArea.displayName = 'TextArea';

export default TextArea;
