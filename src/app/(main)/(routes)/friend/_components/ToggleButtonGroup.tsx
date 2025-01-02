'use client';

import { Button } from '@/components/ui/Button';

interface ToggleButtonGroupProps {
    data: {
        label: string;
        id: string;
        varient: any;
    }[];
    onChange?: (id: string) => void;
    activeId?: string;
}

export const ToggleButtonGroup = ({ data, onChange, activeId }: ToggleButtonGroupProps) => {
    const handleClick = (id: string) => {
        if (onChange) {
            onChange(id);
        }
    };

    return (
        <div className="flex gap-4 px-2">
            {data.map((item) => {
                const { id, label, varient } = item;
                const selected = activeId === id;
                return (
                    <Button
                        key={id}
                        type="button"
                        selected={selected}
                        size="sm"
                        variant={varient}
                        onClick={() => handleClick(id)}
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
};
