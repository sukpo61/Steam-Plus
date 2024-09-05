import { NextResponse } from 'next/server';
import { getAppDetails } from '../../actions/steam';

export async function GET(req: Request, { params }: { params: { appId: number } }) {
    try {
        const { appId } = params;

        const appDetail = await getAppDetails(appId);

        // const post = await db.post.findUnique({
        //     where: {
        //         id: channelId,
        //     },
        //     include: {
        //         images: true,
        //     },
        // });

        return NextResponse.json({ rooms: [], appDetail });
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
