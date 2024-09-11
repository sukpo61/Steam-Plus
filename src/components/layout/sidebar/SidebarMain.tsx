'use client';

import { FriendsSidebar } from './FriendsSidebar';
import { ServerSidebar } from './ServerSidebar';

export const SidebarMain = () => {
    return (
        <div className="flex w-full flex-1 flex-col">
            <FriendsSidebar />
            <ServerSidebar />
        </div>
    );
};
