'use client';

import { DefaultSidebar } from './default/DefaultSidebar';
import { ServerSidebar } from './server/ServerSidebar';
import { UserBottomBar } from './UserBottomBar';

export const SidebarClient = () => {
    return (
        <div className="relative z-40 flex h-full w-full flex-col bg-gradient-to-tr from-primary-dark to-primary">
            <div className="flex w-full flex-1 basis-0 flex-col overflow-hidden">
                <DefaultSidebar />
                <ServerSidebar />
            </div>
            <UserBottomBar />
        </div>
    );
};
