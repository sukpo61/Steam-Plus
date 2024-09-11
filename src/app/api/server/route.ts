import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from 'src/lib/db';
import { getAppDetails } from '../actions/steam';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const userId = req.headers.get('User-Id');

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const appData = (await getAppDetails(data.appId)) as any;

        await db.app.upsert({
            where: { id: data.appId },
            update: appData,
            create: { id: data.appId, ...appData },
        });

        const server = await db.server.create({
            data: {
                ...data,
                userId,
                appId: data.appId,
                channels: {
                    create: [{ name: 'general', userId }],
                },
                members: {
                    create: [{ userId, role: MemberRole.ADMIN }],
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[SERVERS_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
