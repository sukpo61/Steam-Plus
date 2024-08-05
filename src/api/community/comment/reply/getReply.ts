'use server';

import getInfiniteScrollData from 'src/api/common/getInfiniteScrollData';
import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import { variableAssignment } from '@utils/variableAssignment';
import { CommentParams } from 'types/params/community';
import { API_Post_COMMENT_REPLY_KEY } from '../../communityQueryKey';

interface getReplyParams {
    params: CommentParams;
    cursor: any;
}

const getReply = async ({ params, cursor }: getReplyParams): Promise<any> => {
    const replyRef = collection(database, variableAssignment(API_Post_COMMENT_REPLY_KEY, params));
    const data = await getInfiniteScrollData<any>(replyRef, cursor);
    return data;
};

export default getReply;
