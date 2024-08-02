import getImageUrl from 'src/api/common/getImageUrl';
import variableAssignment from '@utils/variableAssignment';
import converter from 'types/firebaseTypeConverter';
import { database } from 'src/firebase/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { PostCommunityDetailParameter } from 'types/community/commnitydetail';
import { API_COMMUNITY_DETAIL_KEY } from '../communityQueryKey';
import { CommunityAddFormValue } from '@components/community/add/CommunityAddController';

const postCommunityDetail = async (data: CommunityAddFormValue): Promise<string> => {
    const { images } = data;
    const timestamp = Date.now();

    const newDocRef = doc(
        collection(database, variableAssignment(API_COMMUNITY_DETAIL_KEY)),
    ).withConverter(converter<PostCommunityDetailParameter>());
    const id = newDocRef.id;

    try {
        const imagesUrl = await getImageUrl({
            images,
            url: variableAssignment(API_COMMUNITY_DETAIL_KEY, { id }),
        });
        await setDoc(newDocRef, {
            ...data,
            timestamp,
            username: 'user',
            images: imagesUrl,
        });
        return id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default postCommunityDetail;
