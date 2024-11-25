import { API_SEARCH_KEY } from '@/actions/queryKeys';
import { GameData } from 'types/steam/SteamAppDetailResponse';
import axios from '@/lib/api';

interface GetChannelSearchParameter {
    term: string;
}

const getChannelSearch = async ({ term }: GetChannelSearchParameter): Promise<GameData[]> => {
    const { data } = await axios.get(API_SEARCH_KEY, { params: { term } });
    return data;
};

export { getChannelSearch };
