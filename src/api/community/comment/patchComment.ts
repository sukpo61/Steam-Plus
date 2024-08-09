import { getImageUrl } from '@/api/common/getImageUrl';
import { CommentFormValue } from '@/components/community/post/comment/CommentInput';
import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { CommentParams } from 'types/params/community';
import { API_COMMENT_KEY } from './postComment';

interface PatchCommentParameter {
    params: CommentParams;
    data: Partial<CommentFormValue>;
}

export const patchComment = async ({ params, data }: PatchCommentParameter): Promise<void> => {
    const { images } = data;
    const { replyId } = params;
    const url = variableAssignment(API_COMMENT_KEY, params);
    try {
        const imageUrl = images && (await getImageUrl({ images, url }));
        await axios.patch(
            url,
            { ...data, images: imageUrl },
            {
                params: { isreply: Boolean(replyId) },
            },
        );
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
