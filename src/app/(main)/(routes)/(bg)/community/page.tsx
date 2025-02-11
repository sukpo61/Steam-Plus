import { CommunityParams, CommunitySearchParams } from 'types/params/community';

import { CommunityController } from './_components/CommunityController';
import { CommunityHeader } from './_components/CommunityHeader';
import { CommunityServer } from './_components/CommunityServer';
import { Fragment } from 'react';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { Separator } from '@/components/ui/Separator';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface CommunityPageProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPageLoading = () => {
    const PostTileLoading = () => (
        <div className="relative z-10 flex h-[340px] w-full cursor-pointer flex-col bg-primary/80">
            <div className="flex h-full w-full animate-pulse flex-col">
                <div className="relative flex w-full flex-1 flex-col items-start gap-2">
                    <div className="absolute left-0 top-0 flex w-full items-center justify-between p-4">
                        <span className="ellipsis rounded-md bg-primary-bright text-3xl text-transparent">
                            titletitletitle
                        </span>
                        <span className="rounded-md bg-primary-bright text-sm text-transparent">
                            자유
                        </span>
                    </div>
                    <div className="relative z-10 mt-11 flex h-auto w-full flex-1 basis-0 flex-col items-start gap-2 overflow-hidden p-4">
                        <span className="rounded-md bg-primary-bright text-sm text-transparent">
                            21:00
                        </span>
                    </div>
                </div>
                <Separator />
                <div className="flex min-h-[70px] w-full items-center justify-between border-t-2 border-primary-bright p-4">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-primary-bright" />
                        <span className="rounded-md bg-primary-bright text-sm text-transparent">
                            nickname
                        </span>
                    </div>
                    <span className="rounded-md bg-primary-bright text-sm text-transparent">
                        댓글 10 조회수 19
                    </span>
                </div>
            </div>
        </div>
    );

    const LoadingList = Array(10).fill(<PostTileLoading />);

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
            <div className="flex w-full max-w-[948px] flex-col items-center p-10">
                <div className="mb-8 flex w-full animate-pulse flex-row">
                    <span className="rounded-md bg-primary-bright text-4xl text-transparent">
                        커뮤니티
                    </span>
                </div>
                <CommunityHeader />
                <div className="mb-4 grid w-full grid-cols-2 gap-2.5">
                    {LoadingList.map((item, index) => (
                        <Fragment key={index}>{item}</Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CommunityPage: NextPage<CommunityPageProps> = async ({ params, searchParams }) => {
    const { page = '1', category = 'all', order = 'popular' } = searchParams;
    const defaultParams = { ...searchParams, page, category, order };

    return (
        <SidebarLayout type="library">
            <CommunityController params={params} searchParams={defaultParams}>
                <QuerySuspenseErrorBoundary suspenseFallback={<CommunityPageLoading />}>
                    <CommunityServer params={params} searchParams={defaultParams} />
                </QuerySuspenseErrorBoundary>
            </CommunityController>
        </SidebarLayout>
    );
};

export default CommunityPage;
