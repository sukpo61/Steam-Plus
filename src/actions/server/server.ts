import { API_MEMBER_KEY, API_SERVER_JOIN_KEY, API_SERVER_KEY } from '@/actions/queryKeys';

import { ServerParams } from 'types/params/server';
import { ServerRequest } from 'types/community/server';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

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

const postServer = async ({ data }: { data: ServerRequest }): Promise<any> => {
    try {
        const { data: server } = await api.post(variableAssignment(API_SERVER_KEY), data);
        return { serverId: server.id, channelId: server.channels[0].id };
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
}): Promise<any> => {
    const { serverId } = params;
    try {
        await api.patch(variableAssignment(API_SERVER_KEY, params), data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const joinServer = async ({ params }: { params: ServerParams }): Promise<string> => {
    const { serverId } = params;
    try {
        await api.post(variableAssignment(API_SERVER_JOIN_KEY, params));
        return serverId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const leaveServer = async (): Promise<void> => {
    try {
        await api.delete(variableAssignment(API_MEMBER_KEY));
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const kickMember = async ({ params }: { params: { memberId: string } }): Promise<void> => {
    try {
        await api.delete(variableAssignment(API_MEMBER_KEY, params));
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deleteServer, getServer, patchServer, postServer, joinServer, leaveServer, kickMember };
