import axios from 'axios';
import { CommunityParams } from 'types/params/community';
import { CommunitySearchParams } from 'types/params/community';
import { variableAssignment } from '@utils/variableAssignment';

interface getCommunityParameter {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const API_COMMUNITY_KEY = '/api/community/{{channelId}}';

const getCommunity = async ({
    params,
    searchParams = { page: '1', pagesize: '10' },
}: getCommunityParameter): Promise<any> => {
    try {
        const { data } = await axios.get(variableAssignment(API_COMMUNITY_KEY, params), {
            params: searchParams,
        });
        return data;
    } catch (error) {
        console.error('Full error:', error);
        return Promise.reject(error);
    }
};

export default getCommunity;
