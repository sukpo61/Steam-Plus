import { PostAddFormValue } from '@/components/community/add/PostAddController';
import { variableAssignment } from '@/utils/variableAssignment';
import axios from 'axios';
import { getImageUrl } from 'src/api/common/getImageUrl';
import { PostResponse } from 'types/community/post';
import { PostParams } from 'types/params/community';

interface PostParameter {
    params: PostParams;
}
interface uploadPostParameter extends PostParameter {
    data: PostAddFormValue;
}

export const API_POST_KEY = '/api/post/{{postId}}';
export const API_COMMUNITY_KEY = '/api/community/{{channelId}}';

const getPost = async ({ params }: PostParameter): Promise<PostResponse> => {
    console.log('params', variableAssignment(API_POST_KEY, params));

    try {
        const { data } = await axios.get(variableAssignment(API_POST_KEY, params));

        return data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const deletePost = async ({ params }: PostParameter): Promise<string> => {
    const { postId } = params;
    try {
        await axios.delete(variableAssignment(API_POST_KEY, params));
        return postId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

const postPost = async ({ data, params }: uploadPostParameter): Promise<string> => {
    const { images } = data;
    try {
        const imagesUrl = images
            ? await getImageUrl({
                  images,
                  url: 'images',
              })
            : [];
        const { data: resData } = await axios.post(variableAssignment(API_COMMUNITY_KEY, params), {
            ...data,
            images: imagesUrl,
        });
        return resData.id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
const patchPost = async ({ params, data }: uploadPostParameter): Promise<string> => {
    const { images } = data;
    const { postId } = params;
    const url = variableAssignment(API_POST_KEY, params);
    try {
        const imageUrl = images && (await getImageUrl({ images, url }));
        await axios.patch(url, { ...data, images: imageUrl });
        return postId;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export { deletePost, getPost, patchPost, postPost };
