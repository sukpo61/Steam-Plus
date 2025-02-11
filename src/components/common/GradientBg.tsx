import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { seededRandom } from '@/utils/seededRandom';

export interface GradientBgProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    children?: React.ReactNode;
}

const bgVariants = cva('relative  w-full', {
    variants: {
        variant: {
            0: 'bg-gradient-to-r from-slate-500 to-slate-800',
            1: 'bg-gradient-to-r from-rose-400 to-red-500',
            2: 'bg-gradient-to-r from-fuchsia-600 to-purple-600',
            3: 'bg-gradient-to-r from-blue-600 to-violet-600',
            4: 'bg-gradient-to-r from-purple-500 to-purple-900',
            5: 'bg-gradient-to-r from-cyan-500 to-blue-500',
            6: 'bg-gradient-to-r from-red-500 to-orange-500',
            7: 'bg-gradient-to-r from-rose-400 to-red-500',
            8: 'bg-gradient-to-r from-blue-200 to-cyan-200',
            9: 'bg-gradient-to-r from-purple-500 to-purple-900',
            10: 'bg-gradient-to-r from-teal-400 to-yellow-200',
        },
    },
    defaultVariants: {
        variant: 0,
    },
});

const GradientBg = React.forwardRef<HTMLDivElement, GradientBgProps>(
    ({ children, id, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    bgVariants({ variant: Math.floor(seededRandom(id) * 10) }),
                    className,
                )}
            >
                {children}
            </div>
        );
    },
);

GradientBg.displayName = 'GradientBg';

export { GradientBg };
