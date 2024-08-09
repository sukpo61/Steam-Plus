import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { CommentParams } from 'types/params/community';
import { API_COMMENT_KEY } from './postComment';

interface CommentParameter {
    params: CommentParams;
    cursor: any;
}

export const getComment = async ({ params, cursor }: CommentParameter): Promise<any> => {
    try {
        const { data } = await axios.get(variableAssignment(API_COMMENT_KEY, params), {
            params: { cursor },
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
