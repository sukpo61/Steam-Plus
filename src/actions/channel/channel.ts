import { API_CHANNEL_KEY } from '../queryKeys';
import { ServerParams } from 'types/params/server';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

const postChannel = async ({ data, params }: { params: ServerParams; data: any }) => {
    try {
        const { serverId } = params;

        const { data: resData } = await api.post(variableAssignment(API_CHANNEL_KEY, params), {
            ...data,
            serverId,
        });

        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const patchChannel = async ({ params, data }: { params: any; data: any }): Promise<void> => {
    const { serverId } = params;

    try {
        await api.patch(variableAssignment(API_CHANNEL_KEY, params), {
            ...data,
            serverId,
        });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const deleteChannel = async ({ params }: { params: any }): Promise<void> => {
    try {
        await api.delete(variableAssignment(API_CHANNEL_KEY, params));
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { postChannel, patchChannel, deleteChannel };
