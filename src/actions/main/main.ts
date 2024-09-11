import { API_MAIN_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';

interface GetMainParameter {}

const getMain = async (): Promise<any> => {
    const { data } = await api.get(API_MAIN_KEY);
    return data;
};

export { getMain };
