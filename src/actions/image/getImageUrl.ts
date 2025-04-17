import { ImageInputValue } from '@/components/ui/ImageInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';
import api from '@/lib/api';
import axios from 'axios';

interface getImageUrlIndexProps {
    image: ImageInputValue;
    url: string;
}
interface getImageUrlProps {
    images: ImageInputValue[];
    url: string;
}
const getImageUrlIndex = async ({ image, url }: getImageUrlIndexProps) => {
    const { id, src } = image;
    if (typeof src === 'string') {
        return image;
    }

    const formData = new FormData();
    formData.append('img', src);

    const { data } = await api.post('/api/image', formData);
    const { imageUrl } = data;

    console.log('imageUrl', imageUrl);

    return {
        id,
        src: imageUrl,
    };
};

export const getImageUrl = async ({ images, url }: getImageUrlProps): Promise<any> => {
    try {
        if (images.length === 0) {
            return [];
        }
        const result = await Promise.all(images.map((image) => getImageUrlIndex({ image, url })));
        return result;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
