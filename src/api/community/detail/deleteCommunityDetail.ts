import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';

interface deleteCommunityDetailParameter {
    id: string;
}

export const API_DELETE_COMMUNITY_DETAIL_KEY = '/community/{{id}}';

const deleteCommunityDetail = async ({ id }: deleteCommunityDetailParameter): Promise<any> => {
    await deleteDoc(doc(database, API_DELETE_COMMUNITY_DETAIL_KEY, id));
};

export default deleteCommunityDetail;
