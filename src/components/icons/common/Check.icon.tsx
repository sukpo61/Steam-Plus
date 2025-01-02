import * as React from 'react';

import { cn } from '@/lib/utils';

export const CheckIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            ref={ref}
            className={cn('h-6 w-6', className)}
            {...props}
        >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
    ),
);
