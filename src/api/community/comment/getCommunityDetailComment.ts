'use server';

import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import getPaginationData from 'src/api/common/getPaginationData';
import { CommunityDetailCommentResponse } from 'types/community/commnitycomment';
import { PaginationResult } from 'src/api/common/getPaginationData';
import { CommunityCommentRequestParams } from 'types/params/community';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from '../communityQueryKey';

const getCommunityDetailComment = async ({
    searchParams,
    params,
}: CommunityCommentRequestParams): Promise<PaginationResult<CommunityDetailCommentResponse>> => {
    const commentRef = collection(
        database,
        variableAssignment(API_COMMUNITY_DETAIL_COMMENT_KEY, params),
    );
    try {
        const data = await getPaginationData<CommunityDetailCommentResponse>({
            ref: commentRef,
            searchParams: searchParams,
            subcollectionName: 'reply',
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default getCommunityDetailComment;
