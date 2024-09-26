'use client';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { SearchIcon } from '@/components/icons/navigation/Search.icon';
import { useRouter } from 'next/navigation';

export const NavSearchButton = () => {
    const { push } = useRouter();

    return (
        <>
            <div
                className="flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-bright"
                onClick={() => push(`/search`)}
            >
                <AddIcon />
            </div>
            <div
                className="flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-bright"
                onClick={() => push(`/`)}
            >
                <SearchIcon />
            </div>
        </>
    );
};
