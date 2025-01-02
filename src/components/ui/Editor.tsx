'use client';

import { ImageInput, ImageInputValue } from './ImageInput';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from './Button';
import { ImagePreview } from './ImagePreview';
import { LoaderIcon } from '../icons/common/Loader.icon';
import { TextArea } from './TextArea';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { type ClassValue } from 'clsx';

export interface EditorProps {
    cancle?: () => void;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength?: number;
    textMaxHeight?: number;
    textMaxLength?: number;
    className?: ClassValue;
    disabled?: boolean;
}

export interface TextImageFormValue {
    content: string;
    images: ImageInputValue[];
}

export const Editor = ({
    cancle,
    placeholder,
    multiple,
    imageMaxlength = 3,
    className,
    textMaxHeight,
    textMaxLength = 3000,
}: EditorProps) => {
    const {
        register,
        setValue,
        control,
        formState: { isSubmitting },
    } = useFormContext<TextImageFormValue>();

    const { data } = useUserStore((state) => state);

    const prevImages = useWatch({ control, name: 'images' });
    const content = useWatch({ control, name: 'content' });

    const isNoContents = prevImages?.length === 0 && content?.length === 0;

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

    return (
        <div
            className={cn(
                'relative flex w-full flex-col rounded-lg bg-primary-bright px-3 py-2',
                className,
            )}
        >
            <header className="mb-2 flex w-full justify-between">
                <span className="text-base">{data.name}</span>
                <div className="flex">
                    {content.length !== 0 && (
                        <span className="text-sm">{`${content.length}/${textMaxLength}`}</span>
                    )}
                </div>
            </header>
            <section className="flex flex-1">
                <TextArea
                    maxLength={textMaxLength}
                    maxHeight={textMaxHeight}
                    placeholder={placeholder}
                    {...register('content')}
                    onSubmit={() => {
                        console.log('submit');
                    }}
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
                    <Button disabled={isSubmitting || isNoContents} variant={'trans'}>
                        {isSubmitting && prevImages.length !== 0 ? <LoaderIcon /> : '등록'}
                    </Button>
                </div>
            </section>
        </div>
    );
};
