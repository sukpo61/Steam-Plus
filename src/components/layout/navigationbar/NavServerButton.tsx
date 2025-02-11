'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/useModalStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavServerButtonProps {
    data: any;
}

export const NavServerButton = ({ data }: NavServerButtonProps) => {
    const {
        id,
        app: { header_image, id: appId },
        channels,
        name,
        role,
    } = data;

    const { push } = useRouter();
    const { onOpen } = useModalStore();
    const [isOver, setIsOver] = useState(false);

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div
                    className="relative flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full"
                    onClick={() => push(`/server/${id}?channelId=${channels[0].id}`)}
                >
                    <Image
                        src={header_image}
                        alt="Postimage"
                        fill
                        objectFit="cover"
                        className="scale-150"
                    />
                </div>
            </HoverCardTrigger>
            <HoverCardContent side="right" sideOffset={20}>
                <span className={cn('rounded-sm bg-primary-darkest p-1 text-sm')}>{name}</span>
            </HoverCardContent>
        </HoverCard>
    );
};

//d
