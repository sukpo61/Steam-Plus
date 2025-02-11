'use client';

import { ReactNode } from 'react';
import { SidebarType } from '@/store/useSidebarStore';
import { useEffect } from 'react';
import { useSidebarStore } from '@/store/useSidebarStore';

interface bgLayoutProps {
    children: ReactNode;
    type: SidebarType;
}

export const SidebarLayout = ({ children, type }: bgLayoutProps) => {
    const { setType } = useSidebarStore();

    useEffect(() => {
        setType(type);
    }, [setType]);

    return <>{children}</>;
};
