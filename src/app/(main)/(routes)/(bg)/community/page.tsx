import { CommunityParams, CommunitySearchParams } from 'types/params/community';

import { CommunityController } from './_components/CommunityController';
import { CommunityServer } from './_components/CommunityServer';
import { NextPage } from 'next';
import { PageProps } from 'types/common/type';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface CommunityPageProps extends PageProps<CommunityParams, CommunitySearchParams> {}

const CommunityPage: NextPage<CommunityPageProps> = async (props: CommunityPageProps) => {
    const searchParams = (await props.searchParams) ?? {};
    const params = (await props.params) ?? {};
    const { page = '1', category = 'all', order = 'popular' } = searchParams;
    const defaultParams = { ...searchParams, page, category, order };

    return (
        <SidebarLayout type="library">
            <CommunityController params={params} searchParams={defaultParams}>
                <CommunityServer params={params} searchParams={defaultParams} />
            </CommunityController>
        </SidebarLayout>
    );
};

export default CommunityPage;
