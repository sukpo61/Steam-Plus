import {
    query,
    orderBy,
    limit,
    startAfter,
    getDocs,
    CollectionReference,
    DocumentData,
    doc,
    getDoc,
} from 'firebase/firestore';

export interface PaginationResult<T> {
    data: T[];
    cursor: any;
}

const PAGE_SIZE = 3;

const getPageData = async (ref: CollectionReference<DocumentData>, cursor?: any) => {
    let baseQuery = query(ref, orderBy('timestamp', 'desc'), limit(PAGE_SIZE));
    if (cursor !== 0) {
        const lastDoc = await getDoc(doc(ref, cursor));
        baseQuery = query(baseQuery, startAfter(lastDoc));
        return getDocs(baseQuery);
    }
    return getDocs(baseQuery);
};

const getInfiniteScrollData = async <T>(
    ref: CollectionReference<DocumentData>,
    cursor?: any,
): Promise<PaginationResult<T>> => {
    const snapshot = await getPageData(ref, cursor);

    if (snapshot.empty) {
        return { data: [], cursor: null };
    }

    const data = snapshot.docs.map((doc) => {
        const docData = {
            id: doc.id,
            ...doc.data(),
        };
        return docData;
    }) as any;

    const nextCursor = PAGE_SIZE === data.length ? data[data.length - 1].id : null;

    return { data, cursor: nextCursor };
};

export default getInfiniteScrollData;
