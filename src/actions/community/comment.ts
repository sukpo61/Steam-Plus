import { API_COMMENT_KEY, API_COMMENT_LIKE_KEY } from '@/actions/queryKeys';
import { CommentParams } from 'types/params/community';
import { CommentRequest } from 'types/community/comment';
import api from '@/lib/api';
import { getImageUrl } from '@/actions/image/getImageUrl';
import { variableAssignment } from '@/utils/variableAssignment';

const getCommentList = async ({
    params,
    cursor,
}: {
    params: CommentParams;
    cursor?: string | null;
}): Promise<any> => {
    try {
        const { data } = await api.get(variableAssignment(API_COMMENT_KEY, params), {
            params: { cursor },
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const postComment = async ({ data, params }: { params: CommentParams; data: CommentRequest }) => {
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
        const { data: resData } = await api.post(
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
    data: CommentRequest;
}): Promise<void> => {
    const { images } = data;
    const url = variableAssignment(API_COMMENT_KEY, params);
    try {
        const imageUrl = images && (await getImageUrl({ images, url }));
        await api.patch(url, { ...data, images: imageUrl });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const submitLike = async ({ params }: { params: CommentParams }): Promise<void> => {
    await api.patch(variableAssignment(API_COMMENT_LIKE_KEY, params));
    try {
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const deleteComment = async ({ params }: { params: CommentParams }): Promise<void> => {
    try {
        await api.delete(variableAssignment(API_COMMENT_KEY, params), {});
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deleteComment, getCommentList, patchComment, postComment, submitLike };
