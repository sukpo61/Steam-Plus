'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { BgLayout } from '@/components/layout/main/bgLayout';
import { SearchParams } from 'types/params/search';
import { SearchInput } from './SearchInput';
import { SearchResult } from './SearchResult';

interface SearchPageScreenProps {
    searchParams: SearchParams;
}

const SearchPageLoading = () => {
    const LoadingBlock = () => (
        <div className="flex h-16 w-full cursor-pointer bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20">
            <div className="flex h-full w-full animate-pulse">
                <div className="relative h-full w-[138px] bg-primary-bright" />
                <div className="flex h-full flex-1 flex-row items-center justify-between overflow-hidden p-4">
                    <span className="ellipsis bg-primary-bright text-transparent">
                        namenamenamenamenamenamename
                    </span>
                </div>
            </div>
        </div>
    );

    const BlockList = Array(10).fill(<LoadingBlock />);

    return <div className="flex flex-col gap-1">{BlockList}</div>;
};

const SearchPageScreen = ({ searchParams }: SearchPageScreenProps) => {
    const { term } = searchParams;

    return (
        <BgLayout>
            <div className="flex h-full w-full flex-col items-center px-8 pt-4">
                <div className="flex w-full max-w-[948px] flex-col">
                    <SearchInput placeholder="영어로 입력 해 주세요" term={term} />
                    {term && (
                        <div className="mt-4 flex h-full w-full flex-1 flex-col overflow-y-scroll">
                            <QuerySuspenseErrorBoundary suspenseFallback={<SearchPageLoading />}>
                                <SearchResult searchParams={searchParams} />
                            </QuerySuspenseErrorBoundary>
                        </div>
                    )}
                </div>
            </div>
        </BgLayout>
    );
};

export default SearchPageScreen;
