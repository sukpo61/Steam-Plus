'use client';

import { FriendsSidebar } from './FriendsSidebar';
import { ServerSidebar } from './ServerSidebar';

export const SidebarMain = () => {
    return (
        <div className="flex w-full flex-1 basis-0 flex-col overflow-y-scroll">
            {/* <LibrarySidebar /> */}
            <FriendsSidebar />
            <ServerSidebar />
        </div>
    );
};
