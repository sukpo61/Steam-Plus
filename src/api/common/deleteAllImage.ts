import { ref, listAll, deleteObject } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';

const deleteAllImages = async (url: any) => {
    try {
        const listAllFiles = async (url: any) => {
            const storageRef = ref(storage, url);
            const list = await listAll(storageRef);
            return list;
        };

        const deleteImages = async (images: any) => {
            const promises = images.items.map(async (imageRef: any) => {
                await deleteObject(imageRef);
            });
            const folderPromises = images.prefixes.map(async (folderRef: any) => {
                await deleteAllImages(folderRef.fullPath);
            });
            await Promise.all(promises);
            await Promise.all(folderPromises);
        };

        const allImages = await listAllFiles(url);

        await deleteImages(allImages);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default deleteAllImages;
