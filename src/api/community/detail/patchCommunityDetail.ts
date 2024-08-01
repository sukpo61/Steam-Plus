import variableAssignment from '@utils/variableAssignment';
import getImageUrl from 'src/api/common/getImageUrl';
import { database } from 'src/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { API_COMMUNITY_DETAIL_KEY } from './getCommunityDetail';
import { CommunityDetailParams } from 'types/params/community';
import { CommunityAddFormValue } from '@components/community/add/CommunityAddController';
import { PostCommunityDetailParameter } from 'types/community/commnitydetail';
import converter from 'types/firebaseTypeConverter';

interface patchCommunityDetailParameter extends CommunityDetailParams {
    data: Partial<CommunityAddFormValue>;
    prevImage: any;
}
const patchCommunityDetail = async ({
    params,
    data,
    prevImage,
}: patchCommunityDetailParameter): Promise<string> => {
    const { images } = data;
    const { id } = params;

    // const deleteimage = prevImage.filter((i: any) => {
    //     const idarr = image.map((i: any) => i.id);
    //     return idarr.includes(i.id);
    // });

    // if (deleteimage?.length !== 0) {
    //     await deleteImage(image);
    // }

    const imageUrl = await getImageUrl(images);

    const newRef = doc(
        database,
        variableAssignment(API_COMMUNITY_DETAIL_KEY, params),
    ).withConverter(converter<Partial<PostCommunityDetailParameter>>());

    await updateDoc(newRef, { ...data, images: imageUrl });
    return id;
};

export default patchCommunityDetail;
