'use client';

import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

interface SignInClientProps {}

export const SignInClient = () => {
    const handleSteamLogin = () => {
        window.location.href = 'http://localhost:3000/api/auth/steam/signin';
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
