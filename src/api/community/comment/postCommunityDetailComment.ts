import variableAssignment from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import converter from 'types/firebaseTypeConverter';
import { database } from 'src/firebase/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from '../communityQueryKey';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from '../communityQueryKey';
import { CommunityCommentParams } from 'types/params/community';
import { PostCommunityDetailCommentParameter } from 'types/community/commnitycomment';
import { CommentFormValue } from '@components/community/detail/comment/CommunityDetailCommentInput';
interface PostCommentParameter extends CommunityCommentParams {
    data: CommentFormValue;
}

const postCommunityDetailComment = async ({ data, params }: PostCommentParameter) => {
    const { images } = data;
    const { commentId } = params;
    const timestamp = Date.now();

    const urlKey = commentId
        ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY
        : API_COMMUNITY_DETAIL_COMMENT_KEY;

    const newDocRef = doc(collection(database, variableAssignment(urlKey, params))).withConverter(
        converter<PostCommunityDetailCommentParameter>(),
    );
    const id = newDocRef.id;
    try {
        const imageUrl = await getImageUrl({
            images,
            url: variableAssignment(urlKey, { ...params, id }),
        });

        await setDoc(newDocRef, {
            ...data,
            likes: [],
            timestamp,
            username: 'user',
            images: imageUrl,
        });
        return id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default postCommunityDetailComment;
