'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResult } from '@/components/search/SearchResult';
import { SearchParams } from 'types/params/search';

interface SearchPageScreenProps {
    searchParams: SearchParams;
}

const SearchPageScreen = ({ searchParams }: SearchPageScreenProps) => {
    const { term } = searchParams;

    return (
        <div className="flex h-full w-full flex-col items-center px-8 pt-4">
            <div className="flex w-full max-w-[948px] flex-col">
                <SearchInput placeholder="영어로 입력 해 주세요" term={term} />
                {term && (
                    <div className="mt-4 flex h-full w-full flex-1 flex-col overflow-y-scroll">
                        <QuerySuspenseErrorBoundary>
                            <SearchResult term={term} />
                        </QuerySuspenseErrorBoundary>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPageScreen;
