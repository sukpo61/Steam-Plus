import { NextPage } from 'next';
import SearchPageController from './_components/SearchPageController';
import { SidebarLayout } from '@/components/layout/sidebar/SidebarLayout';

interface SearchResultPageProps {
    searchParams: {
        term: string;
    };
}

const SearchResultPage: NextPage<SearchResultPageProps> = async ({ searchParams }) => {
    return (
        <SidebarLayout type="library">
            <SearchPageController searchParams={searchParams} />;
        </SidebarLayout>
    );
};

export default SearchResultPage;
