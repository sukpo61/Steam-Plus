import { API_DM_KEY } from '../queryKeys';
import { DMParams } from 'types/params/dm';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

const getDMMessages = async ({
    cursor,
    params,
}: {
    cursor?: string | null;
    params: DMParams;
}): Promise<any> => {
    try {
        const { data } = await api.get(variableAssignment(API_DM_KEY, params), {
            params: { cursor },
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { getDMMessages };
