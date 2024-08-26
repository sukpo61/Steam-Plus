import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { ChannelParams } from 'types/params/channel';

interface getCommunityParameter {
    params: ChannelParams;
}

export const API_CHANNEL_KEY = '/api/channel/{{channelId}}';

export const getChannel = async ({ params }: getCommunityParameter): Promise<any> => {
    const { channelId } = params;
    if (!channelId) return;
    try {
        const { data } = await api.get(variableAssignment(API_CHANNEL_KEY, params));
        return data;
    } catch (error) {
        console.error('Full error:', error);
        return Promise.reject(error);
    }
};
