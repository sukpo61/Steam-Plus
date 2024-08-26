import Image from 'next/image';
import { useMemo } from 'react';
import { CloseIcon } from '../icons/common/Close.icon';
import { ImageInputValue } from './ImageInput';

interface ImagePreviewProps {
    image: ImageInputValue;
    onClose?: () => void;
}

export const ImagePreview = ({ image, onClose }: ImagePreviewProps) => {
    const { src } = image;

    const ImageSource = useMemo(() => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, [src]);

    return (
        <div className="relative flex h-20 w-20 overflow-hidden rounded">
            <button
                onClick={onClose}
                className="absolute right-0.5 top-0.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/50"
            >
                <CloseIcon />
            </button>
            <Image src={ImageSource} alt="imagepreview" fill className="object-cover" />
        </div>
    );
};
