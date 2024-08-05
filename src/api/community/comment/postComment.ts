import { variableAssignment } from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import converter from 'types/firebaseTypeConverter';
import { database } from 'src/firebase/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { API_Post_COMMENT_KEY } from '../communityQueryKey';
import { API_Post_COMMENT_REPLY_KEY } from '../communityQueryKey';
import { CommentParams } from 'types/params/community';
import { CommentRequest } from 'types/community/comment';
import { CommentFormValue } from '@components/community/post/comment/CommentInput';

interface PostCommentParameter {
    params: CommentParams;
    data: CommentFormValue;
}

const postComment = async ({ data, params }: PostCommentParameter) => {
    const { images } = data;
    const { commentId } = params;
    const timestamp = Date.now();

    const urlKey = commentId ? API_Post_COMMENT_REPLY_KEY : API_Post_COMMENT_KEY;

    const newDocRef = doc(collection(database, variableAssignment(urlKey, params))).withConverter(
        converter<PostCommentParameter>(),
    );
    const id = newDocRef.id;
    try {
        const imageUrl = await getImageUrl({
            images,
            url: variableAssignment(urlKey, { ...params, id }),
        });

        // await setDoc(newDocRef, {
        //     ...data,
        //     likes: [],
        //     timestamp,
        //     username: 'user',
        //     images: imageUrl,
        // });
        return id;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default postComment;
