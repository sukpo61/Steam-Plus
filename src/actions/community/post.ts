import { getImageUrl } from '@/actions/image/getImageUrl';
import { PostAddFormValue } from '@/components/community/add/PostAddController';
import api from '@/lib/api';
import { variableAssignment } from '@/utils/variableAssignment';
import { PostResponse } from 'types/community/post';
import { PostParams } from 'types/params/community';
import { API_COMMUNITY_KEY } from './community';

export const API_POST_KEY = '/api/post/{{postId}}';

const getPost = async ({ params }: { params: PostParams }): Promise<PostResponse> => {
    try {
        const { data } = await api.get(variableAssignment(API_POST_KEY, params));

        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const deletePost = async ({ params }: { params: PostParams }): Promise<string> => {
    const { postId } = params;
    try {
        await api.delete(variableAssignment(API_POST_KEY, params));
        return postId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const postPost = async ({
    data,
    params,
}: {
    data: PostAddFormValue;
    params: PostParams;
}): Promise<string> => {
    const { images } = data;
    try {
        const imagesUrl = images
            ? await getImageUrl({
                  images,
                  url: 'images',
              })
            : [];
        const { data: resData } = await api.post(variableAssignment(API_COMMUNITY_KEY, params), {
            ...data,
            images: imagesUrl,
        });
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const patchPost = async ({
    data,
    params,
}: {
    data: PostAddFormValue;
    params: PostParams;
}): Promise<string> => {
    const { images } = data;
    const { postId } = params;
    const url = variableAssignment(API_POST_KEY, params);
    try {
        const imageUrl = images && (await getImageUrl({ images, url }));
        await api.patch(url, { ...data, images: imageUrl });
        return postId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deletePost, getPost, patchPost, postPost };
