'use client';

import { useSidebarStore } from '@/store/useSidebarStore';

export const FriendsSidebar = () => {
    const { type, data } = useSidebarStore((state) => state);

    if (type !== 'friend') {
        return <div className="123"></div>;
    }

    return <div className="123 flex h-full w-full flex-col">friend</div>;
};
