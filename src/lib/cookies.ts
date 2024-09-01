'use server';

import { cookies } from 'next/headers';

export const createCookie = (data: any) => {
    const cookieStore = cookies();
    cookieStore.set(data);
};
