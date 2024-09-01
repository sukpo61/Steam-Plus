import * as jose from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.JWT_SECRET),
};

export async function middleware(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = (await jose.jwtVerify(token, jwtConfig.secret)) as {
                payload: { userId: string };
            };
            const { userId } = decodedToken.payload;

            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('User-Id', userId);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
