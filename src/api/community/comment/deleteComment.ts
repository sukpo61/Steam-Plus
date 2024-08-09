import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { CommentParams } from 'types/params/community';
import { API_COMMENT_KEY } from './postComment';
interface CommentProps {
    params: CommentParams;
}

export const deleteComment = async ({ params }: CommentProps): Promise<void> => {
    try {
        const { replyId } = params;
        await axios.delete(variableAssignment(API_COMMENT_KEY, params), {
            params: { isreply: Boolean(replyId) },
        });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
