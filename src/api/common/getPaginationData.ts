import {
    query,
    orderBy,
    where,
    limit,
    startAfter,
    getDocs,
    getCountFromServer,
    CollectionReference,
    DocumentData,
} from 'firebase/firestore';
import { CommunitySearchParams } from 'types/searchParams/community';

export interface PaginationResult<T> {
    data: T[];
    itemCount: number;
    pageSize: number;
}

const PAGE_SIZE = 10;

const buildBaseQuery = (
    ref: CollectionReference<DocumentData>,
    searchParams: CommunitySearchParams,
) => {
    const { category = 'all', term } = searchParams;

    let baseQuery = query(ref);

    if (category !== 'all') {
        baseQuery = query(baseQuery, where('category', '==', category));
    }

    if (term) {
        baseQuery = query(
            baseQuery,
            where('content', '>=', term),
            where('content', '<=', term + '\uf8ff'),
        );
    }

    return baseQuery;
};

const buildQuery = (
    ref: CollectionReference<DocumentData>,
    searchParams: CommunitySearchParams,
    lastDoc?: DocumentData,
) => {
    let baseQuery = buildBaseQuery(ref, searchParams);
    baseQuery = query(baseQuery, orderBy('timestamp', 'desc'), limit(PAGE_SIZE));

    if (lastDoc) {
        baseQuery = query(baseQuery, startAfter(lastDoc));
    }

    return baseQuery;
};

const getDataCount = async (
    ref: CollectionReference<DocumentData>,
    searchParams: CommunitySearchParams,
) => {
    const baseQuery = buildBaseQuery(ref, searchParams);
    const snapshot = await getCountFromServer(baseQuery);
    return snapshot.data().count;
};

const getPageData = async (
    ref: CollectionReference<DocumentData>,
    searchParams: CommunitySearchParams,
) => {
    const { page } = searchParams;
    const pageNumber = page ? Number(page) : 1;

    if (pageNumber === 1) {
        const q = buildQuery(ref, searchParams);
        return getDocs(q);
    } else {
        const prevPageSnapshot = await getDocs(
            query(ref, orderBy('timestamp', 'desc'), limit(PAGE_SIZE * (pageNumber - 1))),
        );
        const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];
        const q = buildQuery(ref, searchParams, lastDoc);
        return getDocs(q);
    }
};

const getPaginationData = async <T>(
    ref: CollectionReference<DocumentData>,
    searchParams: CommunitySearchParams,
): Promise<PaginationResult<T>> => {
    const itemCount = await getDataCount(ref, searchParams);
    const snapshot = await getPageData(ref, searchParams);

    if (snapshot.empty) {
        return { data: [], itemCount: 0, pageSize: 0 };
    }

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as T[];

    return { data, itemCount, pageSize: PAGE_SIZE };
};

export default getPaginationData;
