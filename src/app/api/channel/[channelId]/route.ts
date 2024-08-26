import { NextResponse } from 'next/server';
import { getChannelDetails } from '../../actions/steam';

export async function GET(req: Request, { params }: { params: { channelId: number } }) {
    try {
        const { channelId } = params;

        const channelDetail = await getChannelDetails(channelId);

        // const post = await db.post.findUnique({
        //     where: {
        //         id: channelId,
        //     },
        //     include: {
        //         images: true,
        //     },
        // });

        return NextResponse.json({ rooms: [], channelDetail });
    } catch (error) {
        console.log('POST_GET', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
