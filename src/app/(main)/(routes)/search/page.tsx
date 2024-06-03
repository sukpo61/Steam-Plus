'use client';

import styled from '@emotion/styled';
import { Header } from '@components/ui/Header';
import SearchInput from '@components/search/SearchInput';

interface SearchPageProps {
    params: {
        keyword: string;
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const SearchPage = () => {
    return (
        <Container>
            <Header centerArea={<SearchInput />} />
        </Container>
    );
};

export default SearchPage;
