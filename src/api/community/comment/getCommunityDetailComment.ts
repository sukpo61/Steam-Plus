import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import getPaginationData from 'src/api/common/getPaginationData';
import { CommunityDetailCommentResponse } from 'types/community/commnitycomment';
import { PaginationResult } from 'src/api/common/getPaginationData';
import { CommunityCommentRequestParams } from 'types/params/community';

export const API_COMMUNITY_DETAIL_COMMENT_KEY = 'community/{{postId}}/comment/{{id}}';

const getCommunityDetailComment = async ({
    searchParams,
    params,
}: CommunityCommentRequestParams): Promise<PaginationResult<CommunityDetailCommentResponse>> => {
    const commentRef = collection(
        database,
        variableAssignment(API_COMMUNITY_DETAIL_COMMENT_KEY, params),
    );
    const data = await getPaginationData<CommunityDetailCommentResponse>({
        ref: commentRef,
        searchParams: searchParams,
        subcollectionName: 'reply',
    });
    return data;
};

export default getCommunityDetailComment;
