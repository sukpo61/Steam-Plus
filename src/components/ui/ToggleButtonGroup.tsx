'use client';

import ToggleButton from './ToggleButton';

interface ToggleButtonGroupProps {
    data?: {
        label: string;
        id?: string;
    }[];
    onChange?: (id: string) => void;
    activeId?: string;
}

export const COMMUNIY_CATEGORY_LABEL = [
    {
        label: '전체',
        id: 'all',
    },
    {
        label: '자유',
        id: 'free',
    },
    {
        label: '모집',
        id: 'recruit',
    },
];

export const ToggleButtonGroup = ({
    data = COMMUNIY_CATEGORY_LABEL,
    onChange,
    activeId,
}: ToggleButtonGroupProps) => {
    const handleClick = (id: string) => {
        if (onChange) {
            onChange(id);
        }
    };
    return (
        <div className="flex w-full flex-col">
            <div className="flex">
                {data.map((item) => {
                    const { label, id = 'all' } = item;
                    const selected = activeId === id;
                    return (
                        <ToggleButton
                            key={label}
                            label={label}
                            selected={selected}
                            onClick={() => handleClick(id)}
                        />
                    );
                })}
            </div>
            <div className="flex h-1 w-full bg-primary-darkest" />
        </div>
    );
};
