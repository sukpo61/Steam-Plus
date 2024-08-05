import { variableAssignment } from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import { CommentParams } from 'types/params/community';
import { CommentRequest } from 'types/community/comment';
import { CommentFormValue } from '@components/community/post/comment/CommentInput';

interface PatchCommentParameter {
    params: CommentParams;
    data: Partial<CommentFormValue>;
    isLike?: {
        value: boolean;
    };
}

const patchComment = async ({ params, data, isLike }: PatchCommentParameter): Promise<void> => {
    // const { images, like } = data;
    // const url = variableAssignment(
    //     params.replyId ? API_Post_COMMENT_REPLY_KEY : API_Post_COMMENT_KEY,
    //     params,
    // );
    // const newRef = doc(database, url).withConverter(converter<Partial<PostPostCommentParameter>>());
    // try {
    //     if (isLike) {
    //         await updateDoc(newRef, { likes: isLike.value ? arrayUnion(like) : arrayRemove(like) });
    //         return;
    //     }
    //     const imageUrl = images && (await getImageUrl({ images, url }));
    //     await updateDoc(newRef, { ...data, images: imageUrl });
    // } catch (error) {
    //     console.error(error);
    //     return Promise.reject(error);
    // }
};

export default patchComment;
