import { QueryDocumentSnapshot } from 'firebase/firestore';
import { WithFieldValue } from 'firebase/firestore';

const converter = <T>() => ({
    toFirestore: (data: WithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export default converter;
