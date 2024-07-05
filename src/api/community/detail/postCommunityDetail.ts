import { database } from 'src/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { PostCommunityDetailParameter } from 'types/community/CommnityType';

export const API_POST_COMMUNITY_DETAIL_KEY = 'community';

const postCommunityDetail = async (data: PostCommunityDetailParameter) => {
    const timestamp = Date.now();
    await addDoc(collection(database, API_POST_COMMUNITY_DETAIL_KEY), {
        ...data,
        timestamp,
        userId: 'user',
    });
};

export default postCommunityDetail;
