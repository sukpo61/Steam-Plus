import { ref, listAll, deleteObject, ListResult, StorageReference } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';

const deleteAllImages = async (url: string) => {
    try {
        const listAllFiles = async (url: string) => {
            const storageRef = ref(storage, url);
            const list = await listAll(storageRef);
            return list;
        };

        const deleteImages = async (images: ListResult) => {
            const promises = images.items.map(async (imageRef: StorageReference) => {
                await deleteObject(imageRef);
            });
            const folderPromises = images.prefixes.map(async (folderRef: StorageReference) => {
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
