'use client';

import { API_MESSAGE_KEY } from '@/actions/queryKeys';
import { Button } from '@/components/ui/Button';
import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import Image from 'next/image';
import { ServerSearchParams } from 'types/params/server';
import { deleteImage } from '@/actions/image/deletemage';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface MessageImagesProps {
    data: any;
    searchParams: ServerSearchParams;
    imageOnly: boolean;
}

export const MessageImage = ({ data, searchParams, imageOnly }: MessageImagesProps) => {
    const queryCache = useQueryClient();

    const [isOver, setIsOver] = useState(false);

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteImage,
        onSuccess: async () => {
            await queryCache.invalidateQueries({ queryKey: [API_MESSAGE_KEY, searchParams] });
        },
    });
    const { id, src } = data;

    const deleteHandler = () => {
        const userConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (userConfirm) {
            deleteMutate({ params: { id } });
        }
    };

    return (
        <div
            className="relative h-[300px] w-[400px]"
            onMouseEnter={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            {isOver && (
                <Button
                    size={'icon'}
                    className="absolute right-1 top-1 z-50"
                    onClick={deleteHandler}
                >
                    <DeleteIcon />
                </Button>
            )}
            <Image key={id} src={src} alt="Postimage" fill className="rounded-lg" />
        </div>
    );
};
