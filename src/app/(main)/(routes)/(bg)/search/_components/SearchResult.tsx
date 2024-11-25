import { API_SEARCH_KEY } from '@/actions/queryKeys';
import { AppBlock } from './ChannelBlock';
import { SearchParams } from 'types/params/search';
import { getChannelSearch } from '@/actions/search/search';
import { useSuspenseQuery } from '@tanstack/react-query';

interface SearchResultProps {
    searchParams: SearchParams;
}

export const SearchResult = ({ searchParams }: SearchResultProps) => {
    const { term } = searchParams;

    const { data } = useSuspenseQuery({
        queryKey: [API_SEARCH_KEY, { term }],
        queryFn: () => getChannelSearch({ term }),
    });

    return (
        <>
            {data.length === 0 ? (
                <div className="flex h-10 w-full items-center justify-center">
                    <span>검색결과가 없습니다.</span>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {data.map((item) => (
                        <AppBlock searchParams={searchParams} data={item} key={item.steam_appid} />
                    ))}
                </div>
            )}
        </>
    );
};
