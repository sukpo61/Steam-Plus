'use client';

import { DefaultLoading } from '@/components/common/DefaultLoading';
import api from '@/lib/api';
import { createCookie } from '@/lib/cookies';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CallbackClientProps {
    searchParams: any;
}

const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

export const CallbackClient = ({ searchParams }: CallbackClientProps) => {
    const { replace } = useRouter();
    const { accessToken, refreshToken } = searchParams;

    useEffect(() => {
        const steamAuth = async () => {
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            await createCookie({
                name: 'refreshToken',
                value: refreshToken,
                expires: new Date(Date.now() + EXPIRE_TIME),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });

            replace('/');
        };

        steamAuth();
    }, []);

    return <DefaultLoading />;
};
