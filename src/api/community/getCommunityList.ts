'use server';

import getPaginationData from '../common/getPaginationData';
import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { CommunitySearchParams } from 'types/params/community';
import { PaginationResult } from '../common/getPaginationData';
import { API_COMMUNITY_LIST_KEY } from './communityQueryKey';

const getCommunityList = async ({
    searchParams,
}: CommunitySearchParams): Promise<PaginationResult<CommunityDetailResponse>> => {
    const communityRef = collection(database, API_COMMUNITY_LIST_KEY);
    try {
        const data = await getPaginationData<CommunityDetailResponse>({
            ref: communityRef,
            searchParams: searchParams,
            subcollectionName: 'comment',
        });
        return data;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default getCommunityList;
