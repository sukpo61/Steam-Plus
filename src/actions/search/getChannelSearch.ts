import axios from '@/lib/api';
import { GameData } from 'types/steam/SteamAppDetailResponse';

interface GetChannelSearchParameter {
    term: string;
}

export const API_GET_CHANNEL_SEARCH_KEY = '/api/search';

const getChannelSearch = async ({ term }: GetChannelSearchParameter): Promise<GameData[]> => {
    const { data } = await axios.get(API_GET_CHANNEL_SEARCH_KEY, { params: { term } });
    return data;
};

export default getChannelSearch;
