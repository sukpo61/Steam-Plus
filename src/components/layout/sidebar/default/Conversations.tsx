'use client';

import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useUserStore } from '@/store/useUserStore';

export const Conversations = () => {
    const { type } = useSidebarStore((state) => state);
    const { push } = useRouter();
    const {
        data: { conversations },
    } = useUserStore((state) => state);
    const pathname = usePathname();

    if (type !== 'friend') {
        return;
    }

    return (
        <div className="flex h-full w-full flex-col pb-2">
            <span className="p-2 text-sm">{`다이렉트 메세지`}</span>
            {conversations?.map((item: any) => {
                const isSelected = pathname === `/dm/${item.user.id}`;
                return (
                    <div
                        className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-primary-bright',
                            isSelected && 'bg-primary-bright',
                        )}
                        key={item.id}
                        onClick={() => push(`/dm/${item.user.id}`)}
                    >
                        <UserAvatar src={item.user.avatar} />
                        <span className="text-xs">{item.user.name}</span>
                    </div>
                );
            })}
        </div>
    );
};
