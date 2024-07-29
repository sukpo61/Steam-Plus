'use client';

import styled from '@emotion/styled';
import { CommunitySearchParams } from 'types/searchParams/community';
import { useSuspenseQuery } from '@tanstack/react-query';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import getCommunityDetailComment from 'src/api/community/comment/getCommunityDetailComment';
import StyledPagination from '@components/ui/Pagination';
import CommunityDetailCommentInput from './CommunityDetailCommentInput';
import CommunityDetailCommentContainer from './CommunityDetailCommentContainer';
import RestartIcon from '@components/icons/common/Restart.icon';
import { useUpdateParams } from '@hooks/useUpdateParams';
import { Text } from '@components/ui/Text';

interface CommunityDetailCommentListProps {
    searchParams: CommunitySearchParams;
    params: {
        postId: string;
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
    background-color: var(--darkerGrey);
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
    padding-left: 4px;
`;
const InputContainer = styled.div`
    display: flex;
    margin-bottom: 16px;
    width: 100%;
`;
const IconContainer = styled.button`
    display: flex;
`;

const CommunityDetailCommentList = ({ params, searchParams }: CommunityDetailCommentListProps) => {
    const { page } = searchParams;
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const { data, refetch } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_DETAIL_COMMENT_KEY, params, searchParams],
        queryFn: () => getCommunityDetailComment({ params, searchParams }),
    });

    const { data: commentData, itemCount, pageSize } = data;

    return (
        <Container>
            <CommentMeta>
                <Text text={'댓글'} />
                <Text text={itemCount || '0'} />
                <IconContainer onClick={() => refetch()}>
                    <RestartIcon />
                </IconContainer>
            </CommentMeta>
            <InputContainer>
                <CommunityDetailCommentInput params={params} />
            </InputContainer>
            {commentData.map((item) => (
                <CommunityDetailCommentContainer
                    key={item.id}
                    item={item}
                    params={{ ...params, commentId: item.id }}
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
                hideDisabled
            />
        </Container>
    );
};

export default CommunityDetailCommentList;
