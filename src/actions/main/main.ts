import { API_LIBRARY_KEY, API_MAIN_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';

interface GetMainParameter {}

const getMain = async (): Promise<any> => {
    const { data } = await api.get(API_MAIN_KEY);
    return data;
};

const getLibrary = async (): Promise<any> => {
    const { data } = await api.get(API_LIBRARY_KEY);
    return data;
};

export { getLibrary, getMain };
