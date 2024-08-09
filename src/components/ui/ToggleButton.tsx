'use client';

import { Text } from '@/components/ui/Text';
import { MouseEventHandler } from 'react';

export interface ToggleButtonProps {
    label: string;
    selected: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const ToggleButton = ({ onClick, label, selected }: ToggleButtonProps) => {
    return (
        <div
            className={`flex min-w-20 h-10 px-[1px] pt-[1px] ${selected && 'bg-gradient-to-b from-secondary to-primary-darkest'} `}
        >
            <button
                onClick={onClick}
                className={`flex w-full h-full items-center justify-center px-4 ${selected && 'bg-primary-darkest'} `}
            >
                <span className="text-sm">{label}</span>
            </button>
        </div>
    );
};

export default ToggleButton;
