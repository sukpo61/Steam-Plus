import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { CommunityResponse } from 'types/community/post';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface getCommunityParameter {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const getCommunity = async ({
    params,
    searchParams,
}: getCommunityParameter): Promise<CommunityResponse> => {
    try {
        const { data } = await api.get(variableAssignment(API_COMMUNITY_KEY, params), {
            params: { ...searchParams, pagesize: '10' },
        });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
