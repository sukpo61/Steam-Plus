'use client';

import styled from '@emotion/styled';
import ToggleButtonGroup from '@components/ui/ToggleButtonGroup';
import CommunityList from '@components/community/CommunityList';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import SearchInput from '@components/search/SearchInput';
import { useUpdateParams } from '@hooks/useUpdateParams';
import { CommunitySearchParams } from 'types/params/community';
import { Text } from '@components/ui/Text';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/Button';
import { Typo } from 'styles/Typography';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%; // 화면 전체 높이로 설정
    overflow-y: scroll; // scroll 대신 auto 사용
    padding: 80px 20px 40px;
`;
const SearchInputContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    background-color: var(--Background-Neutral-LightSofter);
`;
const Title = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 32px;
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 948px;
    width: 100%;
    align-items: center;
`;

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

const CommunityPageScreen = ({ searchParams }: CommunitySearchParams) => {
    const { category, term } = searchParams;
    const { push } = useRouter();

    const { updateParams } = useUpdateParams();

    const handleCategoryChange = (category?: string) => {
        updateParams({ category, page: '1' });
    };

    return (
        <Container>
            <Main>
                <Title>
                    <Text text="커뮤니티" typo={Typo.Title.Header1Regular} />
                </Title>
                <ToggleButtonGroup
                    data={COMMUNIY_CATEGORY_LABEL}
                    onChange={handleCategoryChange}
                    activeId={category}
                />
                <SearchInputContainer>
                    <SearchInput placeholder="검색어를 입력해주세요" term={term} />
                    <Button
                        text="글쓰기"
                        onClick={() => {
                            push('community/add');
                        }}
                    />
                </SearchInputContainer>
                <QuerySuspenseErrorBoundary>
                    <CommunityList searchParams={searchParams} />
                </QuerySuspenseErrorBoundary>
            </Main>
        </Container>
    );
};

export default CommunityPageScreen;
