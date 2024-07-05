import { database } from 'src/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';

interface patchCommunityDetailCommentReplyParameter {
    id: string;
    data: any;
}

export const API_PATCH_COMMUNITY_DETAIL_KEY = '/test/{{id}}';

const patchCommunityDetailCommentReply = async ({
    id,
    data,
}: patchCommunityDetailCommentReplyParameter): Promise<any> => {
    const newRef = doc(database, 'Tweets', id);
    await updateDoc(newRef, data);
};

export default patchCommunityDetailCommentReply;
