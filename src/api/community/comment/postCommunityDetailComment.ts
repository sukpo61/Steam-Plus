import { database } from 'src/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import variableAssignment from '@utils/variableAssignment';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from './getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from './reply/getCommunityDetailCommentReply';
import getImageUrl from 'src/api/common/getImageUrl';
interface postCommunityDetailCommentParameter {
    data: any;
    params: {
        postId: string;
        commentId?: string;
    };
}

const postCommunityDetailComment = async ({
    data,
    params,
}: postCommunityDetailCommentParameter) => {
    const { image } = data;
    const imageUrl = image ? await getImageUrl(image) : null;
    const timestamp = Date.now();
    await addDoc(
        collection(
            database,
            variableAssignment(
                params.commentId
                    ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY
                    : API_COMMUNITY_DETAIL_COMMENT_KEY,
                params,
            ),
        ),
        {
            ...data,
            timestamp,
            userId: 'user',
            ...(image && { image: imageUrl }),
        },
    );
};

export default postCommunityDetailComment;
