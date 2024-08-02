'use server';

import variableAssignment from '@utils/variableAssignment';
import deleteAllImages from 'src/api/common/deleteAllImage';
import { database } from 'src/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { CommunityDetailParams } from 'types/params/community';
import { API_COMMUNITY_DETAIL_KEY } from '../communityQueryKey';

const deleteCommunityDetail = async ({ params }: CommunityDetailParams): Promise<void> => {
    const url = variableAssignment(API_COMMUNITY_DETAIL_KEY, params);
    try {
        await deleteDoc(doc(database, url));
        await deleteAllImages(url);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default deleteCommunityDetail;
