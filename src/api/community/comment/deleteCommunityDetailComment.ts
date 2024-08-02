'use server';

import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from '../communityQueryKey';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from '../communityQueryKey';
import deleteAllImages from 'src/api/common/deleteAllImage';
import { CommunityDetailCommentParams } from 'types/params/community';

const deleteCommunityDetailComment = async ({
    params,
}: CommunityDetailCommentParams): Promise<void> => {
    const url = variableAssignment(
        params.replyId ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY : API_COMMUNITY_DETAIL_COMMENT_KEY,
        params,
    );
    try {
        await deleteDoc(doc(database, url));
        await deleteAllImages(url);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default deleteCommunityDetailComment;
