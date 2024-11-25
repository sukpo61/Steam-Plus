import { BgLayout } from '@/components/layout/main/BgLayout';
import { Fragment } from 'react';
import { MainController } from './_components/MainController';
import { MainServer } from './_components/MainServer';
import { NextPage } from 'next';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SearchInput } from '@/components/common/SearchInput';

interface MainPageProps {
    searchParams: any;
}

const MainPageLoading = () => {
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

const MainPage: NextPage<MainPageProps> = async ({ searchParams }) => {
    const { term } = searchParams;

    return (
        <MainController searchParams={searchParams}>
            <div className="flex h-full w-full flex-col items-center overflow-y-scroll px-8 py-8">
                <div className="flex w-full max-w-[1600px] flex-col gap-4">
                    <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-2xl">
                        <BgLayout>
                            <div className="flex h-full w-full items-center justify-center px-4">
                                <div className="w-full max-w-[560px]">
                                    <SearchInput placeholder="영어로 입력 해 주세요" term={term} />
                                </div>
                            </div>
                        </BgLayout>
                    </div>
                    <div className="flex h-full w-full flex-1 flex-col gap-2">
                        <span className="text-xl">추천 앱</span>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                            <QuerySuspenseErrorBoundary suspenseFallback={<MainPageLoading />}>
                                <MainServer searchParams={searchParams} />
                            </QuerySuspenseErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </MainController>
    );
};

export default MainPage;
