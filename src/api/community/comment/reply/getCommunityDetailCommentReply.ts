'use server';

import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import getInfiniteScrollData from 'src/api/common/getInfiniteScrollData';
import { CommunityCommentParams } from 'types/params/community';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from '../../communityQueryKey';

interface getCommunityDetailCommentReplyParams extends CommunityCommentParams {
    cursor: any;
}

const getCommunityDetailCommentReply = async ({
    params,
    cursor,
}: getCommunityDetailCommentReplyParams): Promise<any> => {
    const replyRef = collection(
        database,
        variableAssignment(API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, params),
    );

    const data = await getInfiniteScrollData<any>(replyRef, cursor);
    return data;
};

export default getCommunityDetailCommentReply;
