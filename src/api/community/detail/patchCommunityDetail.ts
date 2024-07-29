import { database } from 'src/firebase/firebase';
import { doc, updateDoc, UpdateData } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_KEY } from './getCommunityDetail';
import { PostCommunityDetailParameter } from 'types/community/commnitydetail';
import { CommunityDetailParams } from 'types/community/commnitydetail';
interface patchCommunityDetailParameter {
    params: CommunityDetailParams;
    data: UpdateData<PostCommunityDetailParameter>;
}

const patchCommunityDetail = async ({
    params,
    data,
}: patchCommunityDetailParameter): Promise<string> => {
    const newRef = doc(database, variableAssignment(API_COMMUNITY_DETAIL_KEY, params));
    await updateDoc(newRef, data);
    return newRef.id;
};

export default patchCommunityDetail;
