'use client';

import { ImageInput, ImageInputValue } from './ImageInput';
import { KeyboardEvent, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from './Button';
import { ImagePreview } from './ImagePreview';
import { LoaderIcon } from '../icons/common/Loader.icon';
import { Separator } from './Separator';
import { TextArea } from './TextArea';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';

export interface ChatInputProps {
    cancle?: () => void;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength?: number;
    textMaxHeight?: number;
    textMaxLength?: number;
    className?: string;
    disabled?: boolean;
}

export interface TextImageFormValue {
    content: string;
    images: ImageInputValue[];
}

export const ChatInput = ({
    cancle,
    placeholder,
    multiple,
    imageMaxlength = 3,
    className,
    textMaxHeight = 400,
    textMaxLength = 3000,
}: ChatInputProps) => {
    const {
        register,
        setValue,
        control,
        formState: { isSubmitting },
    } = useFormContext<TextImageFormValue>();

    const { data } = useUserStore((state) => state);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const prevImages = useWatch({ control, name: 'images' });
    const content = useWatch({ control, name: 'content' });

    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const imageList = prevImages?.map((image) => {
        return {
            id: image.id,
            src: getImageSource(image.src),
        };
    });

    const onClose = (id: string) => {
        const filteredImages = prevImages?.filter((image) => image.id !== id);
        setValue('images', filteredImages);
    };

    const handleKeyDown = useCallback<(event: KeyboardEvent<HTMLTextAreaElement>) => void>(
        (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                buttonRef.current?.click();
            }
        },
        [],
    );

    return (
        <div
            className={cn('relative flex w-full flex-col rounded-lg bg-primary-bright', className)}
        >
            {imageList?.length !== 0 && (
                <>
                    <section className="flex w-full gap-4 p-2">
                        {imageList?.map((image) => (
                            <ImagePreview
                                key={image.id}
                                image={image}
                                onClose={() => onClose(image.id)}
                            />
                        ))}
                    </section>
                    <Separator className="bg-primary-brighter" />
                </>
            )}
            <div className="flex w-full items-center">
                <div className="flex h-full">
                    <ImageInput
                        onChange={(images) => setValue('images', images)}
                        prevValue={prevImages}
                        maxLength={imageMaxlength}
                        multiple={multiple}
                        replaceable
                    />
                </div>
                <TextArea
                    onKeyDown={handleKeyDown}
                    maxLength={textMaxLength}
                    maxHeight={400}
                    placeholder={placeholder}
                    className="p-1"
                    {...register('content')}
                />
            </div>
        </div>
    );
};
