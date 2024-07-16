import { database } from 'src/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';

interface postCommunityDetailCommentReplyParameter {
    postId: string;
    commentId: string;
    commentReply: string;
}

export const API_POST_COMMUNITY_DETAIL_COMMENT_REPLY_KEY =
    'community/{{postId}}/comment/{{commentId}}/reply';

const postCommunityDetailCommentReply = async (data: postCommunityDetailCommentReplyParameter) => {
    const { postId, commentId } = data;
    const timestamp = Date.now();
    await addDoc(
        collection(
            database,
            variableAssignment(API_POST_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, { postId, commentId }),
        ),
        {
            ...data,
            timestamp,
            userId: 'user',
        },
    );
};

export default postCommunityDetailCommentReply;
