import { database } from 'src/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';

interface postCommunityDetailCommentParameter {
    postId: string;
    comment: string;
}

export const API_POST_COMMUNITY_DETAIL_COMMENT_KEY = 'community/{{postId}}/comment';

const postCommunityDetailComment = async (data: postCommunityDetailCommentParameter) => {
    const { postId } = data;
    const timestamp = Date.now();
    await addDoc(
        collection(database, variableAssignment(API_POST_COMMUNITY_DETAIL_COMMENT_KEY, { postId })),
        {
            ...data,
            timestamp,
            userId: 'user',
        },
    );
};

export default postCommunityDetailComment;
