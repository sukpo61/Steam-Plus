import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { CommunitySearchParams } from 'types/params/community';
import getPaginationData from '../common/getPaginationData';
import { PaginationResult } from '../common/getPaginationData';

export const API_GET_COMMUNITY_LIST_KEY = 'community';

const getCommunityList = async ({
    searchParams,
}: CommunitySearchParams): Promise<PaginationResult<CommunityDetailResponse>> => {
    const communityRef = collection(database, API_GET_COMMUNITY_LIST_KEY);
    const data = await getPaginationData<CommunityDetailResponse>({
        ref: communityRef,
        searchParams: searchParams,
        subcollectionName: 'comment',
    });
    return data;
};

export default getCommunityList;
