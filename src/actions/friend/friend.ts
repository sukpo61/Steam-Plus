import { API_FRIEND_KEY, API_FRIEND_REQUEST_KEY } from '@/actions/queryKeys';

import { CommunityParams } from 'types/params/community';
import { FriendSearchParams } from 'types/params/friend';
import { PostResponse } from 'types/community/post';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';

interface FriendParams {
    friendId: string;
}

const getFriends = async ({
    searchParams,
}: {
    searchParams: FriendSearchParams;
}): Promise<any[]> => {
    try {
        const { data } = await api.get(variableAssignment(API_FRIEND_KEY), {
            params: searchParams,
        });
        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const postFriend = async ({ params }: { params: FriendParams }): Promise<PostResponse> => {
    try {
        const { data } = await api.post(variableAssignment(API_FRIEND_KEY, params));
        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const deleteFriend = async ({ params }: { params: FriendParams }): Promise<any> => {
    try {
        await api.delete(variableAssignment(API_FRIEND_KEY, params));
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const acceptRequest = async ({ params }: { params: { requestId: string } }): Promise<string> => {
    try {
        const { data: resData } = await api.post(
            variableAssignment(API_FRIEND_REQUEST_KEY, params),
        );
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const cancleRequest = async ({ params }: { params: { requestId: string } }): Promise<string> => {
    try {
        const { data } = await api.delete(variableAssignment(API_FRIEND_REQUEST_KEY, params));

        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export { postFriend, getFriends, deleteFriend, acceptRequest, cancleRequest };
