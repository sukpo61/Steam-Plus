import { doc, getDoc } from 'firebase/firestore';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { database } from 'src/firebase/firebase';
import variableAssignment from '@utils/variableAssignment';
import { CommunityDetailParams } from 'types/community/commnitydetail';

interface getCommunityDetailParams {
    params: CommunityDetailParams;
}

export const API_COMMUNITY_DETAIL_KEY = 'community/{{id}}';

const getCommunityDetail = async ({
    params,
}: getCommunityDetailParams): Promise<CommunityDetailResponse | null> => {
    try {
        const communityDetailRef = doc(
            database,
            variableAssignment(API_COMMUNITY_DETAIL_KEY, params),
        );
        const snapshot = await getDoc(communityDetailRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            return data as CommunityDetailResponse;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default getCommunityDetail;
