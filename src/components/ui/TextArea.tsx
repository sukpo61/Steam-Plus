import {
    ChangeEvent,
    KeyboardEvent,
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
    ({ maxHeight = 48, onChange, className, onKeyDown, ...props }, ref) => {
        const inputRef = useRef<HTMLTextAreaElement | null>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);

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

        const handleKeyDown = useCallback<(event: KeyboardEvent<HTMLTextAreaElement>) => void>(
            (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    buttonRef.current?.click();
                }
                onKeyDown?.(event);
            },
            [],
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
            <>
                <textarea
                    className={cn(
                        'w-full resize-none border-none bg-transparent p-0 text-base placeholder:text-primary-foreground/50 focus:outline-none',
                        className,
                    )}
                    ref={combineRef}
                    rows={1}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    {...props}
                />
                <button className="hidden" ref={buttonRef} />
            </>
        );
    },
);

TextArea.displayName = 'TextArea';
