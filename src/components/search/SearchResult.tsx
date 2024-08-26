import getChannelSearch, { API_GET_CHANNEL_SEARCH_KEY } from '@/actions/search/getChannelSearch';
import NoResult from '@/components/common/NoResult';
import { useSuspenseQuery } from '@tanstack/react-query';
import ChannelBlock from './ChannelBlock';

interface SearchResultProps {
    term: string;
}

export const SearchResult = ({ term }: SearchResultProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_GET_CHANNEL_SEARCH_KEY, { term }],
        queryFn: () => getChannelSearch({ term }),
    });

    return (
        <>
            {data.length === 0 ? (
                <NoResult>
                    <span>검색결과가 없습니다.</span>
                </NoResult>
            ) : (
                <div className="flex flex-col gap-1">
                    {data.map((item) => (
                        <ChannelBlock data={item} key={item.steam_appid} />
                    ))}
                </div>
            )}
        </>
    );
};
