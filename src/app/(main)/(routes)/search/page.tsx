import { NextPage } from 'next';
import SearchPageScreen from '@/components/search/SearchPageScreen';

interface SearchResultPageProps {
    searchParams: {
        term: string;
    };
}

const SearchResultPage: NextPage<SearchResultPageProps> = async ({ searchParams }) => {
    return <SearchPageScreen searchParams={searchParams} />;
};

export default SearchResultPage;
