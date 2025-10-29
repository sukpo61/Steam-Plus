import { ServerParams, ServerSearchParams } from 'types/params/server';

import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { ServerPageServer } from '../_components/ServerPageServer';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';
import { SocketProvider } from '@/provider/SocketProvider';

interface ServerPageProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
}

const ServerPageLoading = () => {
    return <></>;
};

const ServerPage: NextPage<ServerPageProps> = async props => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    return (
        <SidebarLayout type="server">
            <div className="flex h-full w-full flex-col backdrop-blur-3xl">
                <SocketProvider>
                    <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
                        <ServerPageServer params={params} searchParams={searchParams} />
                    </QuerySuspenseErrorBoundary>
                </SocketProvider>
            </div>
        </SidebarLayout>
    );
};

export default ServerPage;
