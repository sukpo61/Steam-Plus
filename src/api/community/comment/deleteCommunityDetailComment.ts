import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

interface deleteCommunityDetailCommentParameter {
    id: string;
}

export const API_DELETE_COMMUNITY_DETAIL_KEY = '/community/{{id}}';

const deleteCommunityDetailComment = async ({
    id,
}: deleteCommunityDetailCommentParameter): Promise<any> => {
    await deleteDoc(doc(database, 'community', id));
};

export default deleteCommunityDetailComment;
