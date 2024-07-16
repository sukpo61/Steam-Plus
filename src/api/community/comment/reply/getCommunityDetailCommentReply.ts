import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import getInfiniteScrollData from 'src/api/common/getInfiniteScrollData';
interface getCommunityDetailCommentReplyParams {
    postId: string;
    commentId: string;
    cursor: any;
}

export const API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY =
    'community/{{postId}}/comment/{{commentId}}/reply';

const getCommunityDetailCommentReply = async ({
    postId,
    commentId,
    cursor,
}: getCommunityDetailCommentReplyParams): Promise<any> => {
    const replyRef = collection(
        database,
        variableAssignment(API_GET_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, { postId, commentId }),
    );

    const data = await getInfiniteScrollData<any>(replyRef, cursor);
    return data;
};

export default getCommunityDetailCommentReply;
