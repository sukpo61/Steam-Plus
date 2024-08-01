import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from './getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from './reply/getCommunityDetailCommentReply';
import deleteAllImages from 'src/api/common/deleteAllImage';
import { CommunityDetailCommentParams } from 'types/params/community';

const deleteCommunityDetailComment = async ({
    params,
}: CommunityDetailCommentParams): Promise<void> => {
    const url = variableAssignment(
        params.replyId ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY : API_COMMUNITY_DETAIL_COMMENT_KEY,
        params,
    );
    await deleteDoc(doc(database, url));
    await deleteAllImages(url);
};

export default deleteCommunityDetailComment;
