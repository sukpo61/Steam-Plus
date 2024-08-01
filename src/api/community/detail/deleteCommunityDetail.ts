import variableAssignment from '@utils/variableAssignment';
import deleteAllImages from 'src/api/common/deleteAllImage';
import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { CommunityDetailParams } from 'types/params/community';
import { API_COMMUNITY_DETAIL_KEY } from './getCommunityDetail';

const deleteCommunityDetail = async ({ params }: CommunityDetailParams): Promise<void> => {
    try {
        const url = variableAssignment(API_COMMUNITY_DETAIL_KEY, params);
        const communityDocRef = doc(database, url);
        deleteDoc(communityDocRef);
        deleteAllImages(url);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default deleteCommunityDetail;
