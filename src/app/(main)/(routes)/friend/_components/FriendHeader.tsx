'use client';

import { Button } from '@/components/ui/Button';
import { FriendIcon } from '@/components/icons/common/Friend.icon';
import { FriendToggleButton } from './FriendToggleButton';
import { Separator } from '@/components/ui/Separator';
import { useBgStore } from '@/store/useBgStore';
import { useQueryClient } from '@tanstack/react-query';

interface FriendHeaderProps {
    data: any;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

export const FriendHeader = ({ data }: FriendHeaderProps) => {
    const { name } = data;
    const { setBackground } = useBgStore((state) => state);
    const queryCache = useQueryClient();

    return (
        <div className="flex h-12 w-full items-center px-2 py-2">
            <span className="rounded-lg px-2 py-1">친구</span>
            <FriendIcon />
            <Separator orientation="vertical" className="mx-3 bg-primary-brighter" />
            <FriendToggleButton />
        </div>
    );
};
