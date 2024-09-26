'use client';

import { SidebarMain } from '@/components/layout/sidebar/SidebarMain';
import { UserBottomBar } from './UserBottomBar';

export const SidebarClient = () => {
    return (
        <div className="relative z-50 flex h-full w-full flex-col bg-primary">
            <SidebarMain />
            <UserBottomBar />
        </div>
    );
};
