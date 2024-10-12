import { ServerParams, ServerSearchParams } from 'types/params/server';

import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import ServerController from '../_components/ServerController';
import { ServerPageServer } from '../_components/ServerPageServer';
import { SocketProvider } from '@/provider/SocketProvider';

interface ServerPageProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
}

const ServerPageLoading = () => {
    return <></>;
};

const ServerPage: NextPage<ServerPageProps> = async ({ params }) => {
    return (
        <div className="flex h-full w-full flex-col backdrop-blur-3xl">
            <SocketProvider>
                <ServerController params={params}>
                    <QuerySuspenseErrorBoundary suspenseFallback={<ServerPageLoading />}>
                        <ServerPageServer params={params} />
                    </QuerySuspenseErrorBoundary>
                </ServerController>
            </SocketProvider>
        </div>
    );
};

export default ServerPage;
