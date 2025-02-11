'use client';

import { Button } from '@/components/ui/Button';
import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import Image from 'next/image';
import { useState } from 'react';

interface MessageImagesProps {
    data: any;
    params?: any;
    isOwned?: boolean;
    onDelete?: (id: string) => void;
    onChange?: any;
}

export const MessageImage = ({ data, isOwned, onChange }: MessageImagesProps) => {
    const [isOver, setIsOver] = useState(false);
    const { id, src } = data;

    const onDelete = (id: string) => onChange(id);

    return (
        <div
            className="relative h-[300px] w-[400px]"
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            {isOver && isOwned && (
                <Button
                    onClick={() => onDelete(id)}
                    size={'icon'}
                    className="absolute right-1 top-1 z-50"
                >
                    <DeleteIcon />
                </Button>
            )}
            <Image key={id} src={src} alt="Postimage" fill className="rounded-lg object-cover" />
        </div>
    );
};
