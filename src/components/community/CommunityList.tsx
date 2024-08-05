'use client';

import styled from '@emotion/styled';
import CommunityPost from './PostTile';
import getCommunity from 'src/api/community/getCommunity';
import StyledPagination from '@components/ui/Pagination';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUpdateParams } from '@hooks/useUpdateParams';
import { Text } from '@components/ui/Text';
import { CommunityParams } from 'types/params/community';
import { CommunitySearchParams } from 'types/params/community';
import { API_COMMUNITY_KEY } from 'src/api/community/post/apiPost';
import { useRouter } from 'next/navigation';

interface CommunityListProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityPostsContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const CommunityList = ({ params, searchParams }: CommunityListProps) => {
    const { page = '1' } = searchParams;
    const { push } = useRouter();
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const onClickHandler = ({ channelId, postId }: any) => {
        push(`community/${channelId}/post/${postId}`);
    };

    const { data } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_KEY, params, searchParams],
        queryFn: () => getCommunity({ params, searchParams }),
    });

    const { data: communityData, totalCount, pageSize } = data;

    if (totalCount === 0) {
        return (
            <div className="flex flex-col justify-center items-center w-full min-h-[340px] mb-4">
                <Text text={'게시물이 없습니다.'} />
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full min-h-[340px] mb-4">
                <div className="grid w-full grid-cols-2 gap-2.5">
                    {communityData.map((item: any) => (
                        <CommunityPost
                            key={item.id}
                            item={item}
                            onClick={(channelId) => onClickHandler({ channelId, postId: item.id })}
                        />
                    ))}
                </div>
            </div>
            <StyledPagination
                // 현제 보고있는 페이지
                activePage={Number(page)}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={pageSize}
                // 총 아이템수
                totalItemsCount={totalCount}
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
