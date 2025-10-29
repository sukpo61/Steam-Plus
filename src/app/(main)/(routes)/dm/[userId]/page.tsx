import { DMParams, DMSearchParams } from 'types/params/dm';

import { DMServer } from '../_components/DMServer';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SocketProvider } from '@/provider/SocketProvider';

interface DirectMessagePageProps {
    params: DMParams;
    searchParams: DMSearchParams;
}

const DirectMessagePageLoading = () => {
    return <></>;
};

const DirectMessagePage: NextPage<DirectMessagePageProps> = async props => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    return (
        <div className="flex h-full w-full flex-col backdrop-blur-3xl">
            <SocketProvider>
                <QuerySuspenseErrorBoundary suspenseFallback={<DirectMessagePageLoading />}>
                    <DMServer params={params} searchParams={searchParams} />
                </QuerySuspenseErrorBoundary>
            </SocketProvider>
        </div>
    );
};

export default DirectMessagePage;
