'use client';

import styled from '@emotion/styled';
import { CommunitySearchParams } from 'types/params/community';
import CommunityPost from './CommunityPost';
import { API_COMMUNITY_LIST_KEY } from 'src/api/community/communityQueryKey';
import getCommunityList from 'src/api/community/getCommunityList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUpdateParams } from '@hooks/useUpdateParams';
import StyledPagination from '@components/ui/Pagination';
import { Text } from '@components/ui/Text';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 340px;
    margin-bottom: 16px;
`;

const CommunityPostsContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const CommunityList = ({ searchParams }: CommunitySearchParams) => {
    const { page = '1' } = searchParams;
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const { data } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_LIST_KEY, searchParams],
        queryFn: () => getCommunityList({ searchParams }),
    });

    const { data: communityData, itemCount, pageSize } = data;

    if (itemCount === 0) {
        return (
            <Container>
                <Text text={'게시물이 없습니다.'} />
            </Container>
        );
    }

    return (
        <>
            <Container>
                <CommunityPostsContainer>
                    {communityData.map((item) => (
                        <CommunityPost key={item.id} item={item} />
                    ))}
                </CommunityPostsContainer>
            </Container>
            <StyledPagination
                // 현제 보고있는 페이지
                activePage={Number(page)}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={pageSize}
                // 총 아이템수
                totalItemsCount={itemCount}
                // 표시할 페이지수
                pageRangeDisplayed={10}
                // 함수
                onChange={handlePageChange}
                hideDisabled
            />
        </>
    );
};

export default CommunityList;
