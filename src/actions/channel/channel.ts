import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { AppParams } from 'types/params/app';
import { API_APP_KEY } from '../queryKeys';

interface getCommunityParameter {
    params: AppParams;
}

export const getApp = async ({ params }: getCommunityParameter): Promise<any> => {
    const { appId } = params;
    if (!appId) return;
    try {
        const { data } = await api.get(variableAssignment(API_APP_KEY, params));
        return data;
    } catch (error) {
        console.error('Full error:', error);
        return Promise.reject(error);
    }
};
