import variableAssignment from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import converter from 'types/firebaseTypeConverter';
import { database } from 'src/firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from '../communityQueryKey';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from '../communityQueryKey';
import { CommunityDetailCommentParams } from 'types/params/community';
import { PostCommunityDetailCommentParameter } from 'types/community/commnitycomment';
import { CommentFormValue } from '@components/community/detail/comment/CommunityDetailCommentInput';

interface PatchCommentParameter extends CommunityDetailCommentParams {
    data: Partial<CommentFormValue>;
    isLike?: {
        value: boolean;
    };
}

const patchCommunityDetailComment = async ({
    params,
    data,
    isLike,
}: PatchCommentParameter): Promise<void> => {
    const { images, like } = data;
    const url = variableAssignment(
        params.replyId ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY : API_COMMUNITY_DETAIL_COMMENT_KEY,
        params,
    );
    const newRef = doc(database, url).withConverter(
        converter<Partial<PostCommunityDetailCommentParameter>>(),
    );

    try {
        if (isLike) {
            await updateDoc(newRef, { likes: isLike.value ? arrayUnion(like) : arrayRemove(like) });
            return;
        }
        const imageUrl = images && (await getImageUrl({ images, url }));
        await updateDoc(newRef, { ...data, images: imageUrl });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default patchCommunityDetailComment;
