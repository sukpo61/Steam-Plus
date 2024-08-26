'use client';

import { QuerySuspenseErrorBoundary } from '../hoc/QuerySuspenseErrorBoundary';
import SidebarScreen from './SidebarScreen';
import UserBottomBar from './UserBottomBar';

const Sidebar = () => {
    return (
        <div className="relative z-50 flex h-full w-full flex-col bg-primary">
            <SidebarScreen />
            <QuerySuspenseErrorBoundary>
                <UserBottomBar />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default Sidebar;
