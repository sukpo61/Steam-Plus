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
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    width?: string;
    margin?: string;
    onSubmit?: any;
    errorMessage?: string;
    type?: 'edit';
    cancle?: () => void;
    textonChange?: (value: any) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            maxLength = 3000,
            onChange,
            onInput,
            width = '100%',
            margin,
            errorMessage,
            cancle,
            textonChange,
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
                textonChange?.(event.currentTarget.value);
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
            <div className="flex w-full flex-col">
                <header className="mb-2 flex w-full justify-between">
                    <span className="text-base">user</span>
                    <div className="flex">
                        {maxLength && length !== 0 && (
                            <span className="text-sm">{`${length.toLocaleString()}/${maxLength.toLocaleString()}`}</span>
                        )}
                    </div>
                </header>
                <textarea
                    className="w-full flex-1 resize-none border-none bg-transparent p-0 text-base placeholder:text-primary-foreground/50 focus:outline-none"
                    ref={combineRef}
                    maxLength={maxLength}
                    onChange={handleTextareaChange}
                    onInput={handleTextareaInput}
                    {...props}
                />
            </div>
        );
    },
);

TextArea.displayName = 'TextArea';
