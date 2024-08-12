import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        // const handleOnInput = useCallback<(event: FormEvent<HTMLTextAreaElement>) => void>(
        //     (event) => {
        //         const target = event.currentTarget.value;
        //         if (maxLength && target.length > maxLength) {
        //             event.currentTarget.value = target.slice(0, maxLength);
        //         }
        //         onInput?.(event);
        //     },
        //     [maxLength, onInput],
        // );

        return (
            <div className="relative flex h-10 w-full">
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border-none bg-input px-3 pr-10 text-base text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
