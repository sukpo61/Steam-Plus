import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface getCommunityParameter {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const getCommunity = async ({
    params,
    searchParams = { page: '1', pagesize: '10' },
}: getCommunityParameter): Promise<any> => {
    try {
        const { data } = await api.get(variableAssignment(API_COMMUNITY_KEY, params), {
            params: searchParams,
        });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
