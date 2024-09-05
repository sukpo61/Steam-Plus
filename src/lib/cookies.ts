'use server';

import { cookies } from 'next/headers';

export const createCookie = (data: any) => {
    const cookieStore = cookies();
    cookieStore.set(data);
};
export const getCookie = async (key: string) => {
    const cookieStore = cookies();
    return cookieStore.get(key)?.value;
};
