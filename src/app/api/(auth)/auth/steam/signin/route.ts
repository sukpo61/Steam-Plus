import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const steamUrl = new URL('https://steamcommunity.com/openid/login');
        steamUrl.searchParams.set('openid.ns', 'http://specs.openid.net/auth/2.0');
        steamUrl.searchParams.set('openid.mode', 'checkid_setup');
        steamUrl.searchParams.set(
            'openid.return_to',
            'http://localhost:3000/api/auth/steam/callback',
        );
        steamUrl.searchParams.set('openid.realm', 'http://localhost:3000');
        steamUrl.searchParams.set(
            'openid.identity',
            'http://specs.openid.net/auth/2.0/identifier_select',
        );
        steamUrl.searchParams.set(
            'openid.claimed_id',
            'http://specs.openid.net/auth/2.0/identifier_select',
        );

        return NextResponse.redirect(steamUrl.toString());
    } catch (error) {
        console.log('Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
