'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResult } from '@/components/search/SearchResult';
import { Header } from '@/components/ui/Header';
import styled from '@emotion/styled';
import { SearchParams } from 'types/params/search';

interface SearchPageScreenProps {
    searchParams: SearchParams;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%; // 화면 전체 높이로 설정
`;

const SearchResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    overflow-y: auto; // scroll 대신 auto 사용
    align-items: center;
    padding: 20px 20px 40px;
`;

const SearchPageScreen = ({ searchParams }: SearchPageScreenProps) => {
    const { term } = searchParams;

    return (
        <Container>
            <Header centerArea={<SearchInput placeholder="영어로 입력 해 주세요" term={term} />} />
            {term && (
                <SearchResultContainer>
                    <QuerySuspenseErrorBoundary>
                        <SearchResult term={term} />
                    </QuerySuspenseErrorBoundary>
                </SearchResultContainer>
            )}
        </Container>
    );
};

export default SearchPageScreen;
