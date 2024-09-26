'use server';

import { cookieString } from '@/utils/cookieString';
import { cookies } from 'next/headers';

export const createCookie = (data: any) => {
    const cookieStore = cookies();
    cookieStore.set(data);
};
export const getCookie = async (key: string) => {
    const cookieStore = cookies();
    return cookieStore.get(key)?.value;
};
export const getAllCookie = () => {
    const cookieStore = cookies();
    const result = cookieString(cookieStore.getAll());
    return result;
};
