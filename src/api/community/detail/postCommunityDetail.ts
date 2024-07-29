import { database } from 'src/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { PostCommunityDetailParameter } from 'types/community/commnitydetail';
import getImageUrl from 'src/api/common/getImageUrl';

interface PostCommunityDetailProps {
    data: PostCommunityDetailParameter;
}

const postCommunityDetail = async ({ data }: PostCommunityDetailProps): Promise<string> => {
    const { image } = data;
    const timestamp = Date.now();
    const imageUrl = image ? await getImageUrl(image) : null;
    const docRef = await addDoc(collection(database, 'community'), {
        ...data,
        timestamp,
        userId: 'user',
        ...(image && { image: imageUrl }),
    });
    return docRef.id;
};

export default postCommunityDetail;
