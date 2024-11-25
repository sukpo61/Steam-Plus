import * as jose from 'jose';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// import { getAllCookie } from '@/lib/cookies';
// import steamApi from './lib/steamApi';

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export async function middleware(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = (await jose.jwtVerify(token, jwtConfig.secret)) as {
                payload: { userId: string };
            };
            const { userId } = decodedToken.payload;
            requestHeaders.set('User-Id', userId);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            console.error('Invalid token:', error);
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }
    }
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: '/api/:path*',
};
