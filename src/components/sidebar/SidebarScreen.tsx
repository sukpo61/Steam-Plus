'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SidebarMain } from '@/components/sidebar/SidebarMain';
import { UserBottomBar } from '@/components/sidebar/UserBottomBar';

const SidebarScreen = () => {
    return (
        <div className="relative z-50 flex h-full w-full flex-col bg-primary">
            <QuerySuspenseErrorBoundary>
                <SidebarMain />
                <UserBottomBar />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default SidebarScreen;
