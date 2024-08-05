'use client';

import styled from '@emotion/styled';
import Post from './Post';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import PostCommentList from './comment/CommentList';
import PostLoading from '@components/loading/PostLoading';
import { PostParams } from 'types/params/community';
import { PostSearchParams } from 'types/params/community';

interface PostPageScreenProps {
    params: PostParams;
    searchParams: PostSearchParams;
}

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

const PostPageScreen = ({ searchParams, params }: PostPageScreenProps) => {
    return (
        <Container>
            <Main>
                <QuerySuspenseErrorBoundary suspenseFallback={<PostLoading />}>
                    <Post params={params} />
                    <PostCommentList searchParams={searchParams} params={params} />
                </QuerySuspenseErrorBoundary>
            </Main>
        </Container>
    );
};

export default PostPageScreen;
