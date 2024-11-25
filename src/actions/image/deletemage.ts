import { API_IMAGE_KEY } from '../queryKeys';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

const deleteImage = async ({ params }: { params: { id: string } }) => {
    const { id: imageId } = params;
    try {
        await api.delete(variableAssignment(API_IMAGE_KEY, { imageId }));
    } catch (error) {
        Promise.reject();
    }
};

export { deleteImage };
