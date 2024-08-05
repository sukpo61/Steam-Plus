import { variableAssignment } from '@utils/variableAssignment';
import { PostSearchParams } from 'types/params/community';
import { CommentParams } from 'types/params/community';

interface CommentParameter {
    searchParams: PostSearchParams;
    params: CommentParams;
}

const getComment = async ({ searchParams, params }: CommentParameter): Promise<any> => {
    try {
        // const data = await getPaginationData<CommentResponse>({
        //     ref: commentRef,
        //     searchParams: searchParams,
        //     subcollectionName: 'reply',
        // });
        // return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default getComment;
