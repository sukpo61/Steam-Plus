import * as React from 'react';
import { Button } from './Button';
import { LikeIcon, UnLikeIcon, LikedIcon, UnLikedIcon } from '@/components/icons/common/Like.icon';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';
import { useState } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    submited?: boolean;
}

export const LikeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, submited, ...props }, ref) => {
        return (
            <Button variant={'trans'} className="p-1" ref={ref} {...props}>
                {submited ? <LikedIcon /> : <LikeIcon />}
            </Button>
        );
    },
);
export const UnLikeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, submited, ...props }, ref) => {
        return (
            <Button variant={'trans'} className="p-1" ref={ref} {...props}>
                {submited ? <UnLikedIcon /> : <UnLikeIcon />}
            </Button>
        );
    },
);
