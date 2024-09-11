import { NextPage } from 'next';
import SearchPageController from './_components/SearchPageController';

interface SearchResultPageProps {
    searchParams: {
        term: string;
    };
}

const SearchResultPage: NextPage<SearchResultPageProps> = async ({ searchParams }) => {
    return <SearchPageController searchParams={searchParams} />;
};

export default SearchResultPage;
