import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { PostPage } from 'types/community/post';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface getCommunityParameter {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const API_COMMUNITY_KEY = '/api/community/{{channelId}}';

export const getCommunity = async ({
    params,
    searchParams = { page: '1', pagesize: '10' },
}: getCommunityParameter): Promise<PostPage> => {
    console.log('params', variableAssignment(API_COMMUNITY_KEY, params));

    try {
        const { data } = await api.get(variableAssignment(API_COMMUNITY_KEY, params), {
            params: searchParams,
        });
        return data;
    } catch (error) {
        console.error('Full error:', error);
        return Promise.reject(error);
    }
};
