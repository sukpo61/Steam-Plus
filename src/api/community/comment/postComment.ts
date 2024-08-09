import { CommentFormValue } from '@/components/community/post/comment/CommentInput';
import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { getImageUrl } from 'src/api/common/getImageUrl';
import { CommentParams } from 'types/params/community';

interface PostCommentParameter {
    params: CommentParams;
    data: CommentFormValue;
}

export const API_COMMENT_KEY = '/api/comment/{{postId}}/{{commentId}}';

export const postComment = async ({ data, params }: PostCommentParameter) => {
    const { images } = data;
    const { replyId } = params;

    try {
        const imagesUrl = images
            ? await getImageUrl({
                  images,
                  url: 'images',
              })
            : [];
        const { data: resData } = await axios.post(
            variableAssignment(API_COMMENT_KEY, params),
            {
                ...data,
                images: imagesUrl,
            },
            {
                params: { isreply: Boolean(replyId) },
            },
        );
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
