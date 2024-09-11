import { SearchInput } from '@/components/common/SearchInput';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { BgLayout } from '@/components/layout/main/bgLayout';
import { NextPage } from 'next';
import { MainController } from './_components/MainController';
import { MainServer } from './_components/MainServer';

interface MainPageProps {
    searchParams: any;
}

const SearchPageLoading = () => {
    const LoadingBlock = () => <></>;

    const BlockList = Array(10).fill(<LoadingBlock />);

    return <div className="flex flex-col gap-1">{BlockList}</div>;
};

const MainPage: NextPage<MainPageProps> = async ({ searchParams }) => {
    const { term } = searchParams;

    return (
        <MainController searchParams={searchParams}>
            <div className="flex h-full w-full flex-col items-center px-8 pt-4">
                <div className="flex w-full max-w-[1600px] flex-col">
                    <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-2xl">
                        <BgLayout>
                            <div className="flex h-full w-full items-center justify-center px-4">
                                <div className="w-full max-w-[560px]">
                                    <SearchInput placeholder="영어로 입력 해 주세요" term={term} />
                                </div>
                            </div>
                        </BgLayout>
                    </div>
                    <div className="mt-4 flex h-full w-full flex-1 flex-col overflow-y-scroll">
                        <QuerySuspenseErrorBoundary suspenseFallback={<SearchPageLoading />}>
                            <MainServer searchParams={searchParams} />
                        </QuerySuspenseErrorBoundary>
                    </div>
                </div>
            </div>
        </MainController>
    );
};

export default MainPage;
