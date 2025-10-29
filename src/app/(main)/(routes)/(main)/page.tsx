// /app/page.tsx (또는 해당 파일 경로)

import { MainParams, MainSearchParams } from 'types/params/main';

import { BgLayout } from '@/components/layout/main/BgLayout';
import { MainController } from './_components/MainController';
import { MainServer } from './_components/MainServer';
import type { PageProps } from 'types/common/type';
import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SearchInput } from '@/components/common/SearchInput';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface MainPageProps extends PageProps<MainParams, MainSearchParams> {}

const MainPageLoading = () => {
    return (
        <>
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="flex h-[320px] w-full animate-pulse rounded-lg bg-primary"
                />
            ))}
        </>
    );
};

const MainPage = async (props: MainPageProps) => {
    const searchParams = (await props.searchParams) ?? {};
    const { term } = searchParams;

    return (
        <MainController searchParams={searchParams}>
            <SidebarLayout type="library">
                <div className="flex h-full w-full flex-col items-center overflow-y-scroll px-8 py-8">
                    <div className="flex w-full max-w-[1600px] flex-col gap-4">
                        <div className="flex aspect-[16/5] w-full items-center justify-center overflow-hidden rounded-2xl">
                            <BgLayout>
                                <div className="flex h-full w-full items-center justify-center px-4">
                                    <div className="w-full max-w-[560px]">
                                        <SearchInput
                                            placeholder="영어로 입력 해 주세요"
                                            term={term}
                                        />
                                    </div>
                                </div>
                            </BgLayout>
                        </div>
                        <div className="flex h-full w-full flex-1 flex-col gap-2">
                            <span className="text-xl">추천 앱</span>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                                <QuerySuspenseErrorBoundary suspenseFallback={<MainPageLoading />}>
                                    <MainServer />
                                </QuerySuspenseErrorBoundary>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarLayout>
        </MainController>
    );
};

export default MainPage;
