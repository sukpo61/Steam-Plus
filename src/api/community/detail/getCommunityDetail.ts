import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { database } from 'src/firebase/firebase';

interface GetCommunityDetailParams {
    id: string;
}

export const API_GET_COMMUNITY_DETAIL_KEY = 'community/{{id}}';

const getCommunityDetail = async ({
    id,
}: GetCommunityDetailParams): Promise<DocumentData | null> => {
    try {
        const communityDetailRef = doc(database, 'community', id);
        const snapshot = await getDoc(communityDetailRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            return data as DocumentData;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default getCommunityDetail;
