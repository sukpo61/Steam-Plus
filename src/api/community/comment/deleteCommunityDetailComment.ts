import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from './getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from './reply/getCommunityDetailCommentReply';
interface deleteCommunityDetailCommentParameter {
    id: string;
    params: {
        postId: string;
        commentId?: string;
        replyId?: string;
    };
}

const deleteCommunityDetailComment = async ({
    id,
    params,
}: deleteCommunityDetailCommentParameter): Promise<any> => {
    return await deleteDoc(
        doc(
            database,
            variableAssignment(
                params.replyId
                    ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY
                    : API_COMMUNITY_DETAIL_COMMENT_KEY,
                params,
            ),
            id,
        ),
    );
};

export default deleteCommunityDetailComment;
