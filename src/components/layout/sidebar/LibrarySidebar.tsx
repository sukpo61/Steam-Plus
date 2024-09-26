'use client';

import { useSidebarStore } from '@/store/useSidebarStore';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

export const LibrarySidebar = () => {
    const { type } = useSidebarStore((state) => state);
    const { push } = useRouter();
    const {
        data: { library },
    } = useUserStore((state) => state);

    // if (type !== 'library') {
    //     return;
    // }

    return (
        <div className="flex h-full w-full flex-col pb-2">
            <span className="p-2 text-sm">{`스팀 라이브러리 (${library?.length})`}</span>
            {library?.map((item: any) => (
                <div
                    className="flex cursor-pointer items-center px-2 py-1 hover:bg-primary-bright"
                    key={item.app.id}
                    onClick={() => push(`/app/${item.app.id}`)}
                >
                    <span className="text-xs">{item.app.name}</span>
                </div>
            ))}
        </div>
    );
};
