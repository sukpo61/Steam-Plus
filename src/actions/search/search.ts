import { API_APP_SEARCH_KEY } from '@/actions/queryKeys';
import axios from '@/lib/api';
import { GameData } from 'types/steam/SteamAppDetailResponse';

interface GetChannelSearchParameter {
    term: string;
}

const getChannelSearch = async ({ term }: GetChannelSearchParameter): Promise<GameData[]> => {
    const { data } = await axios.get(API_APP_SEARCH_KEY, { params: { term } });
    return data;
};

export { getChannelSearch };
