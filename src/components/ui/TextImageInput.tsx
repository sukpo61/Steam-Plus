'use client';

import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Typo } from 'styles/Typography';
import { PostAddFormValue } from '../community/add/PostAddController';
import { Button } from './Button';
import { ImageInput } from './ImageInput';
import { ImagePreview } from './ImagePreview';
import { Text } from './Text';
import { TextArea } from './TextArea';
export interface TextImageInputProps {
    cancle?: () => void;
    errorMessage?: string;
    placeholder?: string;
    multiple?: boolean;
    imageMaxlength: number;
}

export const TextImageInput = ({
    cancle,
    errorMessage,
    placeholder,
    multiple,
    imageMaxlength = 1,
}: TextImageInputProps) => {
    const { register, setValue, control } = useFormContext<PostAddFormValue>();
    const prevImages = useWatch({ control, name: 'images' });

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
        <div className="relative flex h-full min-h-40 w-full flex-col rounded-lg bg-input px-3 py-2">
            <section className="flex flex-1">
                <TextArea placeholder={placeholder} {...register('content')} />
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
                    <Text text={errorMessage} typo={Typo.Error.Error1Regular} />
                    {cancle && <Button onClick={cancle}>취소</Button>}
                    <Button>등록</Button>
                </div>
            </section>
        </div>
    );
};
