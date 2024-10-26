import { API_APP_KEY } from '../queryKeys';
import { API_CHANNEL_KEY } from '../queryKeys';
import { AppParams } from 'types/params/app';
import { ServerParams } from 'types/params/server';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

interface postChannelParameter {
    params: AppParams;
}

export const postChannel = async ({ data, params }: { params: ServerParams; data: any }) => {
    try {
        console.log('post', variableAssignment(API_CHANNEL_KEY, params));

        const { data: resData } = await api.post(variableAssignment(API_CHANNEL_KEY, params), data);

        console.log('channelcreate', resData);

        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
