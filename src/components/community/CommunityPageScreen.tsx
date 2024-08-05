'use client';

import ToggleButtonGroup from '@components/ui/ToggleButtonGroup';
import CommunityList from '@components/community/CommunityList';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import SearchInput from '@components/search/SearchInput';
import CommunityLoading from '@components/loading/CommunityLoading';
import { useUpdateParams } from '@hooks/useUpdateParams';
import { Text } from '@components/ui/Text';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/Button';
import { Typo } from 'styles/Typography';
import { CommunityParams } from 'types/params/community';
import { CommunitySearchParams } from 'types/params/community';

interface CommunityPageScreenProps {
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

const CommunityPageScreen = ({ params, searchParams }: CommunityPageScreenProps) => {
    const { category, term } = searchParams;
    const { push } = useRouter();

    const { updateParams } = useUpdateParams();

    const handleCategoryChange = (category?: string) => {
        updateParams({ category, page: '1' });
    };

    return (
        <div className="flex flex-col items-center p-10">
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="flex flex-row w-full mb-8">
                    <Text text="커뮤니티" typo={Typo.Title.Header1Regular} />
                </div>
                <ToggleButtonGroup
                    data={COMMUNIY_CATEGORY_LABEL}
                    onChange={handleCategoryChange}
                    activeId={category}
                />
                <div className="flex justify-around items-center w-full p-2 mb-4 bg-gray-100">
                    <SearchInput placeholder="검색어를 입력해주세요" term={term} />
                    <Button text="글쓰기" onClick={() => push('/community/123/add')} />
                </div>
                <QuerySuspenseErrorBoundary suspenseFallback={<CommunityLoading />}>
                    <CommunityList params={params} searchParams={searchParams} />
                </QuerySuspenseErrorBoundary>
            </div>
        </div>
    );
};

export default CommunityPageScreen;
