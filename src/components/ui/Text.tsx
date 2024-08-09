import * as React from 'react';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Typo } from 'styles/Typography';
import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'text-[15px]',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                primary: 'bg-indigo-500 text-white hover:bg-indigo-500/90',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const TextContainer = styled.span<TextProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--main-text-color);
    ${({ typo }) => typo || Typo.Body.Body1Regular}
`;

export interface TextProps {
    text?: string | number;
    typo?: SerializedStyles;
    margin?: string;
    align?: 'left' | 'center' | 'right';
    ellipsis?: boolean;
    preLine?: boolean;
    underLine?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface SpanProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLSpanElement, SpanProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export const Text = ({
    text,
    ellipsis = true,
    preLine = false,
    onClick,
    className,
    ...props
}: TextProps) => {
    return (
        <>
            {text ? (
                <TextContainer {...props} onClick={onClick}>
                    {text || ''}
                </TextContainer>
            ) : null}
        </>
    );
};
