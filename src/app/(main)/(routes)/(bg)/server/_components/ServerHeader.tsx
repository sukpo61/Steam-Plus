'use client';

import { useBgStore } from '@/store/useBgStore';
import { useQueryClient } from '@tanstack/react-query';

interface ServerHeaderProps {
    data: any;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const ServerHeader = ({ data }: ServerHeaderProps) => {
    const { name } = data;
    const { setBackground } = useBgStore((state) => state);
    const queryCache = useQueryClient();

    return (
        <div className="flex h-12 w-full items-center border-b border-solid border-b-primary-darker px-2">
            <span>{name}</span>
        </div>
    );
};
