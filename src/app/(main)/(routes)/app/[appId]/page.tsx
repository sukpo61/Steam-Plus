import { AppParams } from 'types/params/app';
import { AppServer } from '../_components/AppServer';
import { Fragment } from 'react';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';

interface FriendPageProps {
    params: AppParams;
}

const FriendPageLoading = () => {
    const LoadingBlock = () => {
        return <div className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary" />;
    };

    const LoadingList = Array(12).fill(<LoadingBlock />);

    return (
        <>
            <div className="flex aspect-[16/5] w-full items-center justify-center gap-4 overflow-hidden">
                <div className="flex h-full flex-1 overflow-hidden rounded-2xl bg-primary" />
                <section className="aspect-[32/13] h-full overflow-hidden rounded-2xl bg-primary" />
            </div>
            <div className="flex w-full flex-col gap-2">
                <span className="text-lg">서버 리스트</span>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {LoadingList.map((item, index) => (
                        <Fragment key={index}>{item}</Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

const FriendPage: NextPage<FriendPageProps> = async props => {
    const params = await props.params;
    const { appId } = params;

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll px-8 py-8">
            <div className="flex w-full max-w-[1600px] flex-col gap-4">
                <QuerySuspenseErrorBoundary suspenseFallback={<FriendPageLoading />}>
                    <AppServer params={{ ...params, appId: Number(appId) }} />
                </QuerySuspenseErrorBoundary>
            </div>
        </div>
    );
};

export default FriendPage;
