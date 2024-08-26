'use client';

import { cn } from '@/lib/utils';
import { KeyboardEvent, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoaderIcon } from '../icons/common/Loader.icon';
import { Button } from './Button';
import { ImageInput, ImageInputValue } from './ImageInput';
import { ImagePreview } from './ImagePreview';
import { TextArea } from './TextArea';
export interface TextImageInputProps {
    cancle?: () => void;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength: number;
    textMaxHeight?: number;
    textMaxLength?: number;
    className?: string;
    disabled?: boolean;
    isPending?: boolean;
}

export interface TextImageFormValue {
    content: string;
    images: ImageInputValue[];
}

export const TextImageInput = ({
    cancle,
    placeholder,
    multiple,
    imageMaxlength = 3,
    className,
    textMaxHeight,
    textMaxLength = 3000,
    isPending,
}: TextImageInputProps) => {
    const { register, setValue, control } = useFormContext<TextImageFormValue>();

    const buttonRef = useRef<HTMLButtonElement>(null);

    const prevImages = useWatch({ control, name: 'images' });
    const content = useWatch({ control, name: 'content' });

    const isNoContents = prevImages.length === 0 && content.length === 0;

    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const imageList = prevImages.map((image) => {
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
            className={cn(
                'relative flex w-full flex-col rounded-lg bg-primary-bright px-3 py-2',
                className,
            )}
        >
            <header className="mb-2 flex w-full justify-between">
                <span className="text-base">user</span>
                <div className="flex">
                    {content.length !== 0 && (
                        <span className="text-sm">{`${content.length}/${textMaxLength}`}</span>
                    )}
                </div>
            </header>
            <section className="flex flex-1">
                <TextArea
                    onKeyDown={handleKeyDown}
                    maxLength={textMaxLength}
                    maxHeight={textMaxHeight}
                    placeholder={placeholder}
                    {...register('content')}
                />
            </section>
            {imageList.length !== 0 && (
                <section className="mb-1 mt-4 flex w-full gap-4">
                    {imageList?.map((image) => (
                        <ImagePreview
                            key={image.id}
                            image={image}
                            onClose={() => onClose(image.id)}
                        />
                    ))}
                </section>
            )}
            <section className="flex w-full items-center justify-between">
                <ImageInput
                    onChange={(images) => setValue('images', images)}
                    prevValue={prevImages}
                    maxLength={imageMaxlength}
                    multiple={multiple}
                    replaceable
                />
                <div className="flex gap-4">
                    {cancle && <Button onClick={cancle}>취소</Button>}
                    <Button disabled={isPending || isNoContents} ref={buttonRef} variant={'trans'}>
                        {isPending && prevImages.length !== 0 ? <LoaderIcon /> : '등록'}
                    </Button>
                </div>
            </section>
        </div>
    );
};
