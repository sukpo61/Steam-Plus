import variableAssignment from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import converter from 'types/firebaseTypeConverter';
import { database } from 'src/firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from './getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from './reply/getCommunityDetailCommentReply';
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
    const imageUrl = await getImageUrl(images);

    const newRef = doc(
        database,
        variableAssignment(
            params.replyId
                ? API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY
                : API_COMMUNITY_DETAIL_COMMENT_KEY,
            params,
        ),
    ).withConverter(converter<Partial<PostCommunityDetailCommentParameter>>());

    if (isLike) {
        await updateDoc(newRef, { likes: isLike.value ? arrayUnion(like) : arrayRemove(like) });
        return;
    }

    await updateDoc(newRef, { ...data, images: imageUrl });
};

export default patchCommunityDetailComment;
