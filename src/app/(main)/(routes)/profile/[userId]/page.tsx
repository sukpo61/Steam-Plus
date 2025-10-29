import { BgLayout } from '@/components/layout/main/BgLayout';
import { Fragment } from 'react';
import { MainController } from '../_components/MainController';
import { MainServer } from '../_components/MainServer';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SearchInput } from '@/components/common/SearchInput';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface ProfilePageProps {
    params: {
        userId: string;
    };
    searchParams: any;
}

const ProfilePageLoading = () => {
    const LoadingBlock = () => {
        return <div className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary" />;
    };
    const LoadingList = Array(12).fill(<LoadingBlock />);
    return (
        <>
            {LoadingList.map((item, index) => (
                <Fragment key={index}>{item}</Fragment>
            ))}
        </>
    );
};

const ProfilePage: NextPage<ProfilePageProps> = async props => {
    const searchParams = await props.searchParams;
    return (
        <MainController searchParams={searchParams}>
            <SidebarLayout type="library">
                <div className="flex h-full w-full flex-col items-center overflow-y-scroll px-8 py-8">
                    <div className="flex w-full max-w-[1600px] flex-col gap-4">
                        <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-2xl">
                            <BgLayout>
                                <div className="flex h-full w-full items-center justify-center px-4"></div>
                            </BgLayout>
                        </div>
                        <div className="flex h-full w-full flex-1 flex-col gap-2">
                            <span className="text-xl">추천 앱</span>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                                <QuerySuspenseErrorBoundary
                                    suspenseFallback={<ProfilePageLoading />}
                                >
                                    <MainServer searchParams={searchParams} />
                                </QuerySuspenseErrorBoundary>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarLayout>
        </MainController>
    );
};

export default ProfilePage;
