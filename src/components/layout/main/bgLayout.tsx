'use client';

import { useBgStore } from '@/store/useBgStore';
import Image from 'next/image';
import { ReactNode } from 'react';

interface bgLayoutProps {
    children: ReactNode;
}

export const BgLayout = ({ children }: bgLayoutProps) => {
    const { appId, background } = useBgStore((state) => state);
    return (
        <div className="relative flex h-full w-full">
            {background && (
                <Image
                    key={appId}
                    src={background}
                    alt="background"
                    fill
                    className="-z-10 object-cover"
                    unoptimized
                />
            )}
            {children}
        </div>
    );
};
