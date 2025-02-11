import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from 'src/lib/utils';
import { useState } from 'react';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary-bright text-primary-foreground hover:bg-primary-brighter ',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                publish: 'bg-publish text-publish-foreground hover:bg-publish/90',
                trans: 'bg-transparent hover:bg-primary-brighter',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                primary: 'bg-primary-bright text-primary-foreground hover:bg-primary-brighter',
                iconround: 'rounded-full',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
                iconround: 'h-10 w-10 rounded-full',
                iconlg: 'h-12 w-12 rounded-full',
                menu: 'flex  w-full justify-start rounded-md px-0 py-1',
            },
            selected: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                selected: true,
                variant: 'default',
                class: 'bg-primary-brighter',
            },
            {
                selected: true,
                variant: 'destructive',
                class: 'bg-destructive/90',
            },
            {
                selected: true,
                variant: 'publish',
                class: 'bg-publish/90',
            },
            {
                selected: true,
                variant: 'trans',
                class: 'bg-primary-brighter',
            },
            {
                selected: true,
                variant: 'outline',
                class: 'bg-accent text-accent-foreground',
            },
            {
                selected: true,
                variant: 'secondary',
                class: 'bg-secondary/80',
            },
            {
                selected: true,
                variant: 'primary',
                class: 'bg-primary-brighter',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    nameTag?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, selected, nameTag, asChild = false, ...props }, ref) => {
        const [isOver, setIsOver] = useState(false);
        const Comp = asChild ? Slot : 'button';
        return (
            <div className="relative z-50 flex">
                <Comp
                    className={cn(buttonVariants({ variant, size, selected, className }))}
                    onMouseEnter={() => setIsOver(true)}
                    onMouseLeave={() => setIsOver(false)}
                    ref={ref}
                    {...props}
                />
                {nameTag && isOver && (
                    <span className="absolute -top-8 rounded-sm bg-primary-dark p-1 text-xs">
                        {nameTag}
                    </span>
                )}
            </div>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
