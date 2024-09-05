import { ImageInputValue } from '@/components/ui/ImageInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';

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
    const storageRef = ref(storage, url + `/${id}`);
    const snapshot = await uploadBytes(storageRef, src);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
        id,
        src: downloadURL,
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

// Create the file metadata
// const metadata = {
//     contentType: 'image/jpeg',
// };

// const uploadTask = uploadBytesResumable(storageRef, src, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//             case 'paused':
//                 console.log('Upload is paused');
//                 break;
//             case 'running':
//                 console.log('Upload is running');
//                 break;
//         }
//     },
//     (error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;
//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;
//             // ...
//             case 'storage/unknown':
//                 // Unknown error occurred, inspect error.serverResponse
//                 break;
//         }
//     },
//     () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             console.log('File available at', downloadURL);
//             return {
//                 id,
//                 src: downloadURL,
//             };
//         });
//     },
// );
