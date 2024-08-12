import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'src/firebase/firebase';

const deleteImages = async ({ images, url }: any) => {
    await Promise.all(
        images.map(async ({ id }: any) => {
            const storageRef = ref(storage, url + id);
            try {
                await deleteObject(storageRef);
            } catch (error) {
                return Promise.reject(error);
            }
        }),
    );
};

export default deleteImages;
