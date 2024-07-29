import { database } from 'src/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from './getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from './reply/getCommunityDetailCommentReply';
interface patchCommunityDetailCommentParameter {
    id: string;
    params: {
        postId: string;
        commentId?: string;
        replyId?: string;
    };
    data: any;
}

const patchCommunityDetailComment = async ({
    id,
    params,
    data,
}: patchCommunityDetailCommentParameter): Promise<any> => {
    const newRef = doc(
        database,
        variableAssignment(
            params.replyId
                ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY
                : API_COMMUNITY_DETAIL_COMMENT_KEY,
            params,
        ),
        id,
    );
    await updateDoc(newRef, data);
};

export default patchCommunityDetailComment;
