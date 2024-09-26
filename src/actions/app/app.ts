import { API_APP_KEY } from '../queryKeys';
import { AppParams } from 'types/params/app';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

interface getCommunityParameter {
    params: AppParams;
}

export const getApp = async ({
    params,
    cursor,
}: {
    params: AppParams;
    cursor?: string | null;
}): Promise<any> => {
    const { appId } = params;
    if (!appId) return;
    try {
        const { data } = await api.get(variableAssignment(API_APP_KEY, params), {
            params: { cursor },
        });
        return data;
    } catch (error) {
        console.error('Full error:', error);
        return Promise.reject(error);
    }
};
