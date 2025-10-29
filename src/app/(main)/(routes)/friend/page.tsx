import { FriendParams, FriendSearchParams } from 'types/params/friend';

import { FriendController } from './_components/FriendController';
import { FriendServer } from './_components/FriendServer';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface FrinedPageProps {
    params: FriendParams;
    searchParams: FriendSearchParams;
}

const FrinedPageLoading = () => {
    return <div></div>;
};

const FrinedPage: NextPage<FrinedPageProps> = async props => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const { type = 'all' } = searchParams;
    const defaultParams = { ...searchParams, type };
    return (
        <SidebarLayout type="friend">
            <FriendController params={params} searchParams={defaultParams}>
                <QuerySuspenseErrorBoundary suspenseFallback={<FrinedPageLoading />}>
                    <FriendServer params={params} searchParams={defaultParams} />
                </QuerySuspenseErrorBoundary>
            </FriendController>
        </SidebarLayout>
    );
};

export default FrinedPage;
