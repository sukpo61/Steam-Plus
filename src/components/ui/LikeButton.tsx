import * as React from 'react';
import { Button } from './Button';
import { LikeIcon, UnLikeIcon, LikedIcon, UnLikedIcon } from '@/components/icons/common/Like.icon';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';
import { useState } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isSubmitted?: boolean;
}

export const LikeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, isSubmitted, ...props }, ref) => {
        return (
            <Button variant={'trans'} className="p-1" ref={ref} {...props}>
                {isSubmitted ? <LikedIcon /> : <LikeIcon />}
            </Button>
        );
    },
);
export const UnLikeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, isSubmitted, ...props }, ref) => {
        return (
            <Button variant={'trans'} className="p-1" ref={ref} {...props}>
                {isSubmitted ? <UnLikedIcon /> : <UnLikeIcon />}
            </Button>
        );
    },
);
