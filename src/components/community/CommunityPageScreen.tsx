// 'use client';

import { Community } from '@/components/community/Community';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityPageScreenProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPageScreen = ({ params, searchParams }: CommunityPageScreenProps) => {
    return (
        <div className="flex h-full w-full flex-col items-center overflow-auto">
            <QuerySuspenseErrorBoundary>
                <Community params={params} searchParams={searchParams} />
            </QuerySuspenseErrorBoundary>
        </div>
    );
};

export default CommunityPageScreen;
