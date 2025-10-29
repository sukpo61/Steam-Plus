'use client';

import { createCookie } from '@/lib/cookies';
import { useEffect } from 'react';

const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export const CookiesProvider = () => {
    useEffect(() => {
        createCookie({
            name: 'Steam_Language',
            value: 'koreana',
            expires: new Date(Date.now() + EXPIRE_TIME),
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });
    }, []);
    return <></>;
};
