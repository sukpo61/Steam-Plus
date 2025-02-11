import { API_IMAGE_KEY } from '../queryKeys';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

const deleteImage = async (id: string) => {
    try {
        await api.delete(variableAssignment(API_IMAGE_KEY, { imageId: id }));
    } catch (error) {
        Promise.reject();
    }
};

export { deleteImage };
