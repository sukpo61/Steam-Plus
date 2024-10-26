import { API_MESSAGE_KEY } from '../queryKeys';
import { ServerSearchParams } from 'types/params/server';
import api from '@/lib/api';

const getMessages = async ({
    cursor,
    searchParams,
}: {
    cursor?: string | null;
    searchParams: ServerSearchParams;
}): Promise<any> => {
    const { channelId } = searchParams;
    try {
        const { data } = await api.get(API_MESSAGE_KEY, {
            params: { cursor, channelId },
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { getMessages };
