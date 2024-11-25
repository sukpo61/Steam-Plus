import * as React from 'react';

import { cn } from '@/lib/utils';

export const Stat2 = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    ({ className, ...props }, ref) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            ref={ref}
            className={cn('h-6 w-6', className)}
            {...props}
        >
            <path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z" />
        </svg>
    ),
);
