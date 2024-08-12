'use client';

import { API_COMMUNITY_KEY, getCommunity } from '@/actions/community/community';
import { Pagination } from '@/components/ui/Pagination';
import { useUpdateParams } from '@/hooks/useUpdateParams';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import { PostTile } from './PostTile';

interface CommunityListProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

const CommunityList = ({ params, searchParams }: CommunityListProps) => {
    const { page = '1' } = searchParams;
    const { push } = useRouter();
    const { updateParams } = useUpdateParams();

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const onClickHandler = ({ channelId, postId }: any) => {
        push(`/community/${channelId}/post/${postId}`);
    };

    const { data } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_KEY, params, searchParams],
        queryFn: () => getCommunity({ params, searchParams }),
    });

    const { data: communityData, totalCount, pageSize } = data;

    if (totalCount === 0) {
        return (
            <div className="mb-4 flex min-h-[340px] w-full flex-col items-center justify-center">
                <span className="text-base">게시물이 없습니다.</span>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 grid w-full grid-cols-2 gap-2.5">
                {communityData.map((item: any) => (
                    <PostTile
                        key={item.id}
                        item={item}
                        onClick={(channelId) => onClickHandler({ channelId, postId: item.id })}
                    />
                ))}
            </div>
            <Pagination
                activePage={Number(page)}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalCount}
                onChange={handlePageChange}
            />
        </>
    );
};

export default CommunityList;
