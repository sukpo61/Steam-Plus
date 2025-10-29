'use server';

import { cookieString } from '@/utils/cookieString';
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';

export const createCookie = async (data: any) => {
    const cookieStore = await cookies();
    cookieStore.set(data);
};
export const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
};
export const getAllCookie = async () => {
    const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies;
    const result = cookieString(cookieStore.getAll());
    return result;
};
