import variableAssignment from '@utils/variableAssignment';
import converter from 'types/firebaseTypeConverter';
import { doc, getDoc } from 'firebase/firestore';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { database } from 'src/firebase/firebase';
import { CommunityDetailParams } from 'types/params/community';

export const API_COMMUNITY_DETAIL_KEY = 'community/{{id}}';

const getCommunityDetail = async ({ params }: CommunityDetailParams) => {
    try {
        const communityDetailRef = doc(
            database,
            variableAssignment(API_COMMUNITY_DETAIL_KEY, params),
        ).withConverter(converter<CommunityDetailResponse>());
        const snapshot = await getDoc(communityDetailRef);
        return snapshot.data();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default getCommunityDetail;
