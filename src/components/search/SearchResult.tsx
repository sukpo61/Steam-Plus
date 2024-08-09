import NoResult from '@/components/common/NoResult';
import { Text } from '@/components/ui/Text';
import { useSuspenseQuery } from '@tanstack/react-query';
import getChannelSearch, { API_GET_CHANNEL_SEARCH_KEY } from 'src/api/search/getChannelSearch';
import GameChannelBlock from './GameChannelBlock';

interface SearchResultProps {
    term: string;
}

export const SearchResult = ({ term }: SearchResultProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_GET_CHANNEL_SEARCH_KEY, { term }],
        queryFn: () => getChannelSearch({ term }),
    });

    if (!data) {
        return;
    }

    return (
        <>
            {data.length === 0 ? (
                <NoResult>
                    <Text text={'검색결과가 없습니다.'} preLine size={20} weight={800} />
                </NoResult>
            ) : (
                <>
                    {data.map((item) => (
                        <GameChannelBlock data={item} key={item.steam_appid} />
                    ))}
                </>
            )}
        </>
    );
};
