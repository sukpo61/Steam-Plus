import { API_GET_USER_INFO_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';

interface GetUserInfoParameter {}

export const getUserInfo = async () => {
    const { data } = await api.get(API_GET_USER_INFO_KEY);
    return data;
};
