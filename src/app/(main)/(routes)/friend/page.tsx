import { FriendParams, FriendSearchParams } from 'types/params/friend';

import { FriendController } from './_components/FriendController';
import { FriendServer } from './_components/FriendServer';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';

interface FrinedPageProps {
    params: FriendParams;
    searchParams: FriendSearchParams;
}

const FrinedPageLoading = () => {
    return <div></div>;
};

const FrinedPage: NextPage<FrinedPageProps> = ({ params, searchParams }) => {
    const { type = 'all' } = searchParams;
    const defaultParams = { ...searchParams, type };
    return (
        <FriendController params={params} searchParams={defaultParams}>
            <QuerySuspenseErrorBoundary suspenseFallback={<FrinedPageLoading />}>
                <FriendServer params={params} searchParams={defaultParams} />
            </QuerySuspenseErrorBoundary>
        </FriendController>
    );
};

export default FrinedPage;
