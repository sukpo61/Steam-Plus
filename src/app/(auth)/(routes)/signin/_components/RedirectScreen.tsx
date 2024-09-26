'use client';

import { DefaultLoading } from '@/components/common/DefaultLoading';
import api from '@/lib/api';
import { createCookie } from '@/lib/cookies';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectScreenProps {
    steamId: string;
    searchParams: any;
}

const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

const RedirectScreen = ({ steamId, searchParams }: RedirectScreenProps) => {
    const { replace } = useRouter();

    useEffect(() => {
        const steamAuth = async () => {
            console.log('searchParams', searchParams);

            if (steamId) {
                const { data } = await axios.get(`http://localhost:3000/api/auth/steam/${steamId}`);

                const { accessToken, refreshToken } = data;

                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                createCookie({
                    name: 'refreshToken',
                    value: refreshToken,
                    expires: new Date(Date.now() + EXPIRE_TIME),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    path: '/',
                });

                replace('/');
            }
        };

        steamAuth();
    }, [steamId]);

    return <DefaultLoading />;
};

export default RedirectScreen;
