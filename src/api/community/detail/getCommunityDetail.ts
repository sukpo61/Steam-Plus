'use server';

import variableAssignment from '@utils/variableAssignment';
import converter from 'types/firebaseTypeConverter';
import { doc, getDoc } from 'firebase/firestore';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { database } from 'src/firebase/firebase';
import { CommunityDetailParams } from 'types/params/community';
import { API_COMMUNITY_DETAIL_KEY } from '../communityQueryKey';
import { redirect } from 'next/navigation';

const getCommunityDetail = async ({ params }: CommunityDetailParams) => {
    const communityDetailRef = doc(
        database,
        variableAssignment(API_COMMUNITY_DETAIL_KEY, params),
    ).withConverter(converter<CommunityDetailResponse>());
    try {
        const snapshot = await getDoc(communityDetailRef);
        return snapshot.data();
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default getCommunityDetail;
