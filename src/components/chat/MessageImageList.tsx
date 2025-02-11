'use client';

import { MessageImage } from './MessageImage';
import { TextImageFormValue } from '../ui/Editor';
import { useFormContext } from 'react-hook-form';
import { useRef } from 'react';

interface MessageImagesProps {
    data: any;
    params: any;
    isOwned: boolean;
    onDelete: (id: string) => void;
    onChange?: any;
}

export const MessageImageList = ({ data, isOwned }: MessageImagesProps) => {
    const {
        setValue,
        formState: { isSubmitting },
    } = useFormContext<TextImageFormValue>();

    const buttonRef = useRef<HTMLButtonElement>(null);

    const deleteHandler = (id: string) => {
        const result = data.filter((image: any) => image.id !== id);
        setValue('images', result);
        buttonRef.current?.click();
    };

    return (
        <div className="flex gap-1">
            <button className="hidden" ref={buttonRef} />
            {data?.map((image: any) => (
                <MessageImage data={image} isOwned={isOwned} onChange={deleteHandler} />
            ))}
        </div>
    );
};
