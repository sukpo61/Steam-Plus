import { collection } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { CommunitySearchParams } from 'types/searchParams/community';
import getPaginationData from '../common/getPaginationData';
import { PaginationResult } from '../common/getPaginationData';

interface getCommunityListParams {
    searchParams: CommunitySearchParams;
}

export const API_GET_COMMUNITY_LIST_KEY = 'community';

const getCommunityList = async ({
    searchParams,
}: getCommunityListParams): Promise<PaginationResult<CommunityDetailResponse>> => {
    const communityRef = collection(database, API_GET_COMMUNITY_LIST_KEY);
    const data = await getPaginationData<CommunityDetailResponse>(communityRef, searchParams);
    return data;
};

export default getCommunityList;
