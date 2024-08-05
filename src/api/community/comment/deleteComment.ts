import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { variableAssignment } from '@utils/variableAssignment';
import { API_Post_COMMENT_KEY } from '../communityQueryKey';
import { API_Post_COMMENT_REPLY_KEY } from '../communityQueryKey';
import deleteAllImages from 'src/api/common/deleteAllImage';
import { CommentParams } from 'types/params/community';

interface CommentProps {
    params: CommentParams;
}

const deletePostComment = async ({ params }: any): Promise<void> => {
    const url = variableAssignment(
        params.replyId ? API_Post_COMMENT_REPLY_KEY : API_Post_COMMENT_KEY,
        params,
    );
    try {
        await deleteDoc(doc(database, url));
        await deleteAllImages(url);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default deletePostComment;
