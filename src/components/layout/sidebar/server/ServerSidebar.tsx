'use client';

import { Separator } from '@/components/ui/Separator';
import { useSidebarStore } from '@/store/useSidebarStore';

export const ServerSidebar = () => {
    const {
        type,
        data: { serverId, name },
    } = useSidebarStore((state) => state);

    if (type !== 'server') {
        return <></>;
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div className="z-50 flex h-12 w-full items-center border-b border-solid border-b-primary-darker p-4">
                <span>123</span>
            </div>
        </div>
    );
};
