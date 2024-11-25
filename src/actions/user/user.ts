import { API_USER_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';

interface GetUserInfoParameter {}

export const getUserInfo = async () => {
    const { data } = await api.get(API_USER_KEY);
    return data;
};
