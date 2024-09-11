import { API_SERVER_KEY } from '@/actions/queryKeys';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { ServerRequest } from 'types/community/server';
import { ServerParams } from 'types/params/server';

const getServer = async ({ params }: { params: ServerParams }): Promise<any> => {
    try {
        const { data } = await api.get(variableAssignment(API_SERVER_KEY, params));
        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const deleteServer = async ({ params }: { params: ServerParams }): Promise<string> => {
    const { serverId } = params;
    try {
        await api.delete(variableAssignment(API_SERVER_KEY, params));
        return serverId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const postServer = async ({ data }: { data: ServerRequest }): Promise<string> => {
    try {
        const { data: resData } = await api.post(variableAssignment(API_SERVER_KEY), data);
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const patchServer = async ({
    data,
    params,
}: {
    data: ServerRequest;
    params: ServerParams;
}): Promise<string> => {
    const { serverId } = params;
    try {
        await api.patch(variableAssignment(API_SERVER_KEY, params), data);
        return serverId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deleteServer, getServer, patchServer, postServer };
