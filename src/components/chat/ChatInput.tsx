'use client';

import { ImageInput, ImageInputValue } from '@/components/ui/ImageInput';
import { MouseEventHandler, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { DefaultLoading } from '../common/DefaultLoading';
import { ImagePreview } from '@/components/ui/ImagePreview';
import { Separator } from '@/components/ui/Separator';
import { TextArea } from '@/components/ui/TextArea';
import { cn } from '@/lib/utils';

export interface ChatInputProps {
    cancle?: () => void;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength?: number;
    textMaxLength?: number;
    className?: string;
    disabled?: boolean;
    isImageInput?: boolean;
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
    isImageInput = true,
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
                    <div className="relative flex w-full">
                        {isSubmitting && (
                            <div className="absolute z-50 flex h-full w-full items-center justify-center bg-primary/50">
                                <DefaultLoading />
                            </div>
                        )}
                        <section className="flex w-full gap-4 p-2">
                            {imageList?.map((image) => (
                                <ImagePreview
                                    key={image.id}
                                    image={image}
                                    onClose={() => onClose(image.id)}
                                />
                            ))}
                        </section>
                    </div>
                    <Separator className="bg-primary-brighter" />
                </>
            )}
            <div className="flex h-full w-full items-center">
                {!disabled && isImageInput && (
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
