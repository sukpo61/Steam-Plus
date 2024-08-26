'use client';

import CommunityList from '@/components/community/CommunityList';
import { SearchInput } from '@/components/search/SearchInput';
import { Button } from '@/components/ui/Button';
import { ToggleButtonGroup } from '@/components/ui/ToggleButtonGroup';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { useRouter } from 'next/navigation';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';

interface CommunityProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const COMMUNIY_CATEGORY_LABEL = [
    {
        label: '전체',
        id: 'all',
    },
    {
        label: '자유',
        id: 'free',
    },
    {
        label: '모집',
        id: 'recruit',
    },
];

export const Community = ({ params, searchParams }: CommunityProps) => {
    const { category, term } = searchParams;

    // const { data } = useSuspenseQuery({
    //     queryKey: [API_CHANNEL_KEY, params],
    //     queryFn: () => getChannel({ params }),
    // });

    // const { channelDetail } = data;

    // const { background, steam_appid } = channelDetail;

    const { push } = useRouter();

    const { updateParams } = useUpdateParams();

    const handleCategoryChange = (category?: string) => {
        updateParams({ category, page: '1' });
    };

    return (
        <div className="flex h-full w-full flex-col items-center overflow-auto">
            <div className="flex w-full max-w-[948px] flex-col items-center p-10">
                <div className="mb-8 flex w-full flex-row">
                    <span className="text-4xl">커뮤니티</span>
                </div>
                <ToggleButtonGroup
                    data={COMMUNIY_CATEGORY_LABEL}
                    onChange={handleCategoryChange}
                    activeId={category}
                />
                <div className="mb-4 flex w-full items-center justify-around bg-primary-foreground/20 p-2">
                    <SearchInput placeholder="검색어를 입력해주세요" term={term} />
                    <Button onClick={() => push('/community/123/add')}>글쓰기</Button>
                </div>
                <CommunityList params={params} searchParams={searchParams} />
            </div>
        </div>
    );
};
