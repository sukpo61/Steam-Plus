import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { NextPage } from 'next';
import { ServerParams, ServerSearchParams } from 'types/params/server';
import { ServerPageServer } from '../_components/ServerPageServer';

interface ServerPageProps {
    params: ServerParams;
    searchParams: ServerSearchParams;
}

const ServerPageLoading = () => {
    return <></>;
};

const ServerPage: NextPage<ServerPageProps> = async ({ params }) => {
    return (
        <QuerySuspenseErrorBoundary suspenseFallback={<ServerPageLoading />}>
            <ServerPageServer params={params} />
        </QuerySuspenseErrorBoundary>
    );
};

export default ServerPage;
