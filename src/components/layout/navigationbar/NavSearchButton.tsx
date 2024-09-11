'use client';

import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { useRouter } from 'next/navigation';

export const NavSearchButton = () => {
    const { push } = useRouter();

    return (
        <>
            <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary pb-1 transition-colors hover:bg-primary-bright"
                onClick={() => push(`/search`)}
            >
                <span className="text-3xl">+</span>
            </div>
            <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary pb-1 transition-colors hover:bg-primary-bright"
                onClick={() => push(`/`)}
            >
                <SearchIcon />
            </div>
        </>
    );
};
