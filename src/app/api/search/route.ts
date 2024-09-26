import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getChannelSearch } from '../actions/steam';

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const cookie = cookieStore.getAll();

        const { searchParams } = new URL(req.url);
        const term = searchParams.get('term');

        if (!term) {
            return new NextResponse('Term Missing', { status: 400 });
        }

        const data = await getChannelSearch(term);

        return NextResponse.json(data);
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
