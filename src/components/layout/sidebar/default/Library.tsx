'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useUserStore } from '@/store/useUserStore';

export const Library = () => {
    const { type } = useSidebarStore((state) => state);
    const { push } = useRouter();
    const {
        data: { library },
    } = useUserStore((state) => state);
    const pathname = usePathname();
    const isCommunity = pathname.includes('community');

    return (
        <div className="flex h-full w-full flex-col pb-2">
            <span className="p-2 text-sm">{`스팀 라이브러리 (${library?.length})`}</span>
            {library?.map((item: any) => {
                const isSelected = pathname.includes(item.app.id);
                return (
                    <div
                        className={cn(
                            'flex cursor-pointer items-center px-2 py-1 hover:bg-primary-bright',
                            isSelected && 'bg-primary-bright',
                        )}
                        key={item.app.id}
                        onClick={() => push(`/${isCommunity ? 'community' : 'app'}/${item.app.id}`)}
                    >
                        <span className="text-xs">{item.app.name}</span>
                    </div>
                );
            })}
        </div>
    );
};
