'use client';

import styled from '@emotion/styled';
import CommunityDetail from './CommunityDetail';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import CommunityDetailCommentList from './comment/CommunityDetailCommentList';
import { CommunityDetailRequestParams } from 'types/params/community';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%; // 화면 전체 높이로 설정
    overflow-y: scroll; // scroll 대신 auto 사용
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 978px;
    min-height: 100%;
    width: 100%;
`;

const CommunityDetailPageScreen = ({ searchParams, params }: CommunityDetailRequestParams) => {
    const { id: postId } = params;
    return (
        <Container>
            <Main>
                <QuerySuspenseErrorBoundary>
                    <CommunityDetail params={params} />
                    <CommunityDetailCommentList searchParams={searchParams} params={{ postId }} />
                </QuerySuspenseErrorBoundary>
            </Main>
        </Container>
    );
};

export default CommunityDetailPageScreen;
