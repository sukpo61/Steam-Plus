'use client';

import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

interface SignInPageScreenProps {}

const SignInPageScreen = () => {
    const handleSteamLogin = () => {
        const redirectUri = `${window.location.origin}/signin`;
        const steamLoginUrl = ` https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${redirectUri}&openid.realm=${redirectUri}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
        window.location.href = steamLoginUrl;
    };

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
