'use client';

import { Community } from '@/components/community/Community';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageScreenProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPageScreen = ({ params, searchParams }: CommunityPageScreenProps) => {
    return (
        <QuerySuspenseErrorBoundary>
            <Community params={params} searchParams={searchParams} />
        </QuerySuspenseErrorBoundary>
    );
};

export default CommunityPageScreen;
