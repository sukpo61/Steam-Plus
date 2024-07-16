'use client';

import styled from '@emotion/styled';
import { CommunitySearchParams } from 'types/searchParams/community';
import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { API_GET_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import getCommunityDetailComment from 'src/api/community/comment/getCommunityDetailComment';
import StyledPagination from '@components/ui/Pagination';
import CommunityDetailComment from './CommunityDetailComment';
import { useUpdateParams } from '@hooks/useUpdateParams';
import CommunityDetailCommentInput from './CommunityDetailCommentInput';
import { Text } from '@components/ui/Text';

interface CommunityDetailCommentListProps {
    searchParams: CommunitySearchParams;
    params: {
        id: string;
    };
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Container = styled.div`
    width: 100%;
    max-width: 948px;
    background-color: var(--gpStoreDarkerGrey);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    padding: 16px 32px;
`;

const CommentMeta = styled.div`
    display: flex;
    width: 100%;
    gap: 4px;
    margin-bottom: 16px;
`;

const CommunityDetailCommentList = ({ params, searchParams }: CommunityDetailCommentListProps) => {
    const { page } = searchParams;
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

   

    const { data, refetch } = useSuspenseQuery({
        queryKey: [API_GET_COMMUNITY_DETAIL_COMMENT_KEY, params, searchParams],
        queryFn: () => getCommunityDetailComment({ params, searchParams }),
    });

    const { data: commentData, itemCount, pageSize } = data;

    return (
        <Container>
            <CommentMeta>
                <Text text={'댓글'} size={15} color="white" />
                <Text text={itemCount} size={15} preLine={true} />
                <Text text={'새로고침'} size={15} color="white" onClick={() => refetch()} />
            </CommentMeta>
            <CommunityDetailCommentInput params={params} />
            {commentData.map((item) => (
                <CommunityDetailComment
                    key={item.id}
                    item={item}
                    params={params}
                    searchParams={searchParams}
                />
            ))}
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
            />
        </Container>
    );
};

export default CommunityDetailCommentList;
