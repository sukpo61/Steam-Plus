import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_KEY } from './getCommunityDetail';
import { CommunityDetailParams } from 'types/community/commnitydetail';

interface deleteCommunityDetailParameter {
    params: CommunityDetailParams;
}

const deleteCommunityDetail = async ({ params }: deleteCommunityDetailParameter): Promise<void> => {
    try {
        const communityDocRef = doc(database, variableAssignment(API_COMMUNITY_DETAIL_KEY, params));
        await deleteDoc(communityDocRef);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default deleteCommunityDetail;
