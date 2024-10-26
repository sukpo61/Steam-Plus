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
                <section className="flex h-full">
                    <ImageInput
                        prevValue={prevImages}
                        onChange={(images) => setValue('images', images)}
                        maxLength={imageMaxlength}
                        multiple={multiple}
                        replaceable
                    />
                </section>
                <section className="flex flex-1">
                    <TextArea
                        maxLength={textMaxLength}
                        maxHeight={400}
                        placeholder={placeholder}
                        className="p-1"
                        {...register('content')}
                    />
                </section>
                <Button className="hidden" ref={buttonRef} />
            </div>
        </div>
    );
};
