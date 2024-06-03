import variableAssignment from '@utils/variableAssignment';
import axios from 'axios';
import { SteamAppDetailResponse } from 'types/steam/SteamAppDetailResponse';

interface GetChannelSearchParameter {
    id: string;
}

export const API_GET_CHANNEL_DETAIL_KEY = '/api/steam/appdetails/?&appids={{id}}';

const getChannelDetail = async ({
    id,
}: GetChannelSearchParameter): Promise<SteamAppDetailResponse> => {
    const { data } = await axios.get(variableAssignment(API_GET_CHANNEL_DETAIL_KEY, { id }));
    return data[id].data;
};

export default getChannelDetail;
