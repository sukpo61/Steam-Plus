'use client';

import { useSidebarStore } from '@/store/useSidebarStore';

export const ServerSidebar = () => {
    const {
        type,
        data: { serverId },
    } = useSidebarStore((state) => state);

    if (type !== 'server') {
        return <></>;
    }

    return <div className="flex h-full w-full flex-col">server</div>;
};
