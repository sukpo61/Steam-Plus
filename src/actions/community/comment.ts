import { getImageUrl } from '@/actions/image/getImageUrl';
import { CommentFormValue } from '@/components/community/post/comment/CommentInput';
import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { CommentParams } from 'types/params/community';

export const API_COMMENT_KEY = '/api/comment/{{postId}}/{{commentId}}';

const postComment = async ({ data, params }: { params: CommentParams; data: CommentFormValue }) => {
    const { images } = data;
    const { parentId } = params;
    const commentParams = parentId ? { ...params, commentId: parentId } : params;

    try {
        const imagesUrl = images
            ? await getImageUrl({
                  images,
                  url: 'images',
              })
            : [];
        const { data: resData } = await axios.post(
            variableAssignment(API_COMMENT_KEY, commentParams),
            {
                ...data,
                images: imagesUrl,
            },
        );
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const patchComment = async ({
    params,
    data,
}: {
    params: CommentParams;
    data: CommentFormValue;
}): Promise<void> => {
    const { images } = data;
    const url = variableAssignment(API_COMMENT_KEY, params);
    try {
        const imageUrl = images && (await getImageUrl({ images, url }));
        await axios.patch(url, { ...data, images: imageUrl });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const getComment = async ({
    params,
    cursor,
}: {
    params: CommentParams;
    cursor: string | null;
}): Promise<any> => {
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

const deleteComment = async ({ params }: { params: CommentParams }): Promise<void> => {
    try {
        await axios.delete(variableAssignment(API_COMMENT_KEY, params), {});
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deleteComment, getComment, patchComment, postComment };
