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
import { Text } from './Text';
import { Typo } from 'styles/Typography';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    width?: string;
    margin?: string;
    onSubmit?: any;
    errorMessage?: string;
    type?: 'edit';
    cancle?: () => void;
}

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const LengthTextBox = styled.div`
    display: flex;
`;
const TextAreaInput = styled.textarea`
    font-family: 'Pretendard Variable', sans-serif;
    padding: 0;
    width: 100%;
    flex: 1;
    ${Typo.Body.Body1Regular}
    line-height: 22px;
    letter-spacing: -0.03em;
    color: var(--main-text-color);
    background: none;
    border-style: none;
    resize: none;
    ::placeholder {
        color: var(--main-text-color);
        opacity: 50%;
    }
    &:focus {
        outline: none;
    }
`;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            maxLength = 3000,
            onChange,
            onInput,
            width = '100%',
            margin,
            errorMessage,
            cancle,
            ...props
        },
        ref,
    ) => {
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
            if (inputRef.current) {
                setLength(inputRef.current.value.length);
            }
        }, [inputRef.current?.value]);

        return (
            <Container>
                <Header>
                    <Text text={'user'} />
                    <LengthTextBox>
                        {maxLength && length !== 0 && (
                            <Text
                                text={`${length.toLocaleString()}/${maxLength.toLocaleString()}`}
                                typo={Typo.Body.Body4Regular}
                            />
                        )}
                    </LengthTextBox>
                </Header>
                <TextAreaInput
                    ref={combineRef}
                    maxLength={maxLength}
                    onChange={handleTextareaChange}
                    onInput={handleTextareaInput}
                    {...props}
                />
            </Container>
        );
    },
);

TextArea.displayName = 'TextArea';

export default TextArea;
