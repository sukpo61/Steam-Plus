'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { useBgStore } from '@/store/useBgStore';

interface bgLayoutProps {
    children: ReactNode;
}

export const BgLayout = ({ children }: bgLayoutProps) => {
    const { appId, background } = useBgStore((state) => state);
    return (
        <div className="relative flex h-full w-full">
            {background ? (
                <Image
                    key={appId}
                    src={background}
                    alt="background"
                    fill
                    className="-z-10 object-cover"
                    unoptimized
                />
            ) : (
                <div className="bg-radial absolute left-0 top-0 -z-10 h-full w-full from-transparent to-primary" />
            )}
            {children}
        </div>
    );
};
