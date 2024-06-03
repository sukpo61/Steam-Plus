'use client';

import styled from '@emotion/styled';
import { Header } from '@components/ui/Header';
import SearchInput from '@components/search/SearchInput';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import { SearchResult } from '@components/search/SearchResult';

interface SearchResultPageProps {
    params: {
        term: string;
    };
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

const SearchResultPage = ({ params }: SearchResultPageProps) => {
    const { term } = params;

    return (
        <Container>
            <Header centerArea={<SearchInput />} />
            <SearchResultContainer>
                <QuerySuspenseErrorBoundary>
                    <SearchResult term={term} />
                </QuerySuspenseErrorBoundary>
            </SearchResultContainer>
        </Container>
    );
};

export default SearchResultPage;
