'use client';

import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../ui/Button';

interface SignInPageScreenProps {
    searchParams: {
        accessToken: string;
    };
}

const SignInPageScreen = ({ searchParams }: SignInPageScreenProps) => {
    const { replace } = useRouter();

    const handleSteamLogin = () => {
        const redirectUri = `${window.location.origin}/api/auth/steam/callback`;
        const steamLoginUrl = ` https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${redirectUri}&openid.realm=${redirectUri}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
        window.location.href = steamLoginUrl;
    };

    useEffect(() => {
        const { accessToken } = searchParams;
        if (accessToken) {
            console.log('accessToken12', accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            replace('/');
        }
    }, [searchParams]);

    return (
        <div className="flex h-[400px] w-[500px] items-center justify-center gap-4 bg-primary">
            <Button onClick={handleSteamLogin}>Login</Button>
            <Button
                onClick={() => {
                    console.log('header', api.defaults.headers);
                }}
            >
                header
            </Button>
        </div>
    );
};

export default SignInPageScreen;
