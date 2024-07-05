import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import getPaginationData from 'src/api/common/getPaginationData';
import { CommunitySearchParams } from 'types/searchParams/community';
import { CommunityDetailCommentResponse } from 'types/community/commnitycomment';
import { PaginationResult } from 'src/api/common/getPaginationData';

interface getCommunityDetailCommentReplyParams {
    params: { id: string };
    searchParams: CommunitySearchParams;
}

export const API_GET_COMMUNITY_DETAIL_COMMENT_KEY = 'community/{{postId}}/comment';

const getCommunityDetailCommentReply = async ({
    searchParams,
    params,
}: getCommunityDetailCommentReplyParams): Promise<
    PaginationResult<CommunityDetailCommentResponse>
> => {
    const { id: postId } = params;
    const commentRef = collection(
        database,
        variableAssignment(API_GET_COMMUNITY_DETAIL_COMMENT_KEY, { postId }),
    );
    const data = await getPaginationData<CommunityDetailCommentResponse>(commentRef, searchParams);
    return data;
};

export default getCommunityDetailCommentReply;
