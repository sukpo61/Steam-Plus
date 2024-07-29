'use client';

import styled from '@emotion/styled';
import { CommunitySearchParams } from 'types/searchParams/community';
import CommunityPost from './CommunityPost';
import { API_GET_COMMUNITY_LIST_KEY } from 'src/api/community/getCommunityList';
import getCommunityList from 'src/api/community/getCommunityList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUpdateParams } from '@hooks/useUpdateParams';
import StyledPagination from '@components/ui/Pagination';

export interface CommunityListProps {
    searchParams: CommunitySearchParams;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
`;

const CommunityPostsContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const CommunityList = ({ searchParams }: CommunityListProps) => {
    const { page = '1' } = searchParams;
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const { data } = useSuspenseQuery({
        queryKey: [API_GET_COMMUNITY_LIST_KEY, searchParams],
        queryFn: () => getCommunityList({ searchParams }),
    });

    if (!data) {
        return;
    }

    const { data: communityData, itemCount, pageSize } = data;

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
