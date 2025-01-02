'use client';

import { ImageInput, ImageInputValue } from './ImageInput';
import { MouseEventHandler, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from './Button';
import { ImagePreview } from './ImagePreview';
import { Separator } from './Separator';
import { TextArea } from './TextArea';
import { cn } from '@/lib/utils';

export interface ChatInputProps {
    cancle?: () => void;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength?: number;
    textMaxLength?: number;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler;
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
    disabled,
    onClick,
}: ChatInputProps) => {
    const {
        register,
        setValue,
        control,
        formState: { isSubmitting },
    } = useFormContext<TextImageFormValue>();

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
            className={cn(
                'relative flex min-h-10 w-full flex-col rounded-lg bg-primary-bright',
                className,
            )}
            onClick={onClick}
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
            <div className="flex h-full w-full items-center">
                {!disabled && (
                    <section className="flex h-full">
                        <ImageInput
                            prevValue={prevImages}
                            onChange={(images) => setValue('images', images)}
                            maxLength={imageMaxlength}
                            multiple={multiple}
                            replaceable
                        />
                    </section>
                )}
                <section className="ml-2 flex flex-1">
                    <TextArea
                        maxLength={textMaxLength}
                        maxHeight={400}
                        placeholder={disabled ? '권한이 없습니다' : placeholder}
                        className={cn('p-1', className)}
                        disabled={disabled}
                        {...register('content')}
                    />
                </section>
                <Button className="hidden" ref={buttonRef} />
            </div>
        </div>
    );
};
