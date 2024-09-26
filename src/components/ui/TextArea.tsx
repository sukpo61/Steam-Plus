import {
    ChangeEvent,
    TextareaHTMLAttributes,
    forwardRef,
    useCallback,
    useEffect,
    useRef,
} from 'react';

import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxHeight?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ maxLength, maxHeight = 48, onChange, className, ...props }, ref) => {
        const inputRef = useRef<HTMLTextAreaElement | null>(null);

        const resizeTextarea = useCallback(() => {
            if (!inputRef.current) return;
            inputRef.current.style.height = 'auto';
            const scrollHeight = inputRef.current.scrollHeight;
            inputRef.current.style.height =
                scrollHeight < maxHeight ? `${scrollHeight}px` : `${maxHeight}px`;
        }, [inputRef.current]);

        const handleOnChange = useCallback<(event: ChangeEvent<HTMLTextAreaElement>) => void>(
            (event) => {
                resizeTextarea();
                onChange?.(event);
            },
            [onChange],
        );

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

        useEffect(() => {
            resizeTextarea();
        }, [inputRef.current?.value]);

        return (
            <textarea
                className={cn(
                    'w-full resize-none border-none bg-transparent p-0 text-base placeholder:text-primary-foreground/50 focus:outline-none',
                    className,
                )}
                ref={combineRef}
                maxLength={maxLength}
                onChange={handleOnChange}
                {...props}
            />
        );
    },
);

TextArea.displayName = 'TextArea';
