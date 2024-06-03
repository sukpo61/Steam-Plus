import variableAssignment from '@utils/variableAssignment';
import axios from 'axios';
import { GameItem } from 'types/steam/SteamSearchResponse';
import getChannelDetail from './getChannelDetail';
import { SteamAppDetailResponse } from 'types/steam/SteamAppDetailResponse';

interface GetChannelSearchParameter {
    term: string;
    lo?: string;
}

export const API_GET_CHANNEL_SEARCH_KEY =
    '/api/steam/storesearch/?cc={{lo}}&l={{lo}}&term={{term}}';

const getChannelSearch = async ({
    term,
    lo = 'kr',
}: GetChannelSearchParameter): Promise<SteamAppDetailResponse[]> => {
    const { data: channelSummary } = await axios.get(
        variableAssignment(API_GET_CHANNEL_SEARCH_KEY, { term, lo }),
    );
    const appIds = channelSummary.items.map((item: GameItem) => item.id);
    const appDetailsRequests = appIds.map((id: string) => getChannelDetail({ id }));
    const appDetailsResponses = await Promise.all(appDetailsRequests);
    const noneDlcResponses = appDetailsResponses.filter((item) => item.type === 'game');
    return noneDlcResponses;
};

export default getChannelSearch;
