'use client';

import { getCommunity } from '@/actions/community/community';
import { API_COMMUNITY_KEY } from '@/actions/queryKeys';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { useBgStore } from '@/store/useBgStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CommunityParams, CommunitySearchParams } from 'types/params/community';
import { CommunityHeader } from './CommunityHeader';
import { PostTile } from './PostTile';

interface CommunityProps {
    params: CommunityParams;
    searchParams: CommunitySearchParams;
}

export const Community = ({ params, searchParams }: CommunityProps) => {
    const { push } = useRouter();
    const { setBackground } = useBgStore((state) => state);

    const onClickHandler = ({ postId }: any) => {
        push(`/post/${postId}`);
    };

    const { data } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_KEY, params, searchParams],
        queryFn: () => getCommunity({ params, searchParams }),
    });

    const { data: communityData, appData, totalCount, pageSize } = data;
    const { name = '커뮤니티', background } = appData || {};
    const { appId } = params;

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
            <div className="flex w-full max-w-[948px] flex-col items-center p-10">
                <div className="mb-8 flex w-full flex-row justify-between">
                    <span className="text-4xl">{name}</span>
                    {appId ? (
                        <Button type="button" onClick={() => push(`/app/${appId}`)}>
                            채널 리스트
                        </Button>
                    ) : (
                        <div />
                    )}
                </div>
                <CommunityHeader params={params} />
                {totalCount === 0 ? (
                    <div className="mb-4 flex min-h-[340px] w-full flex-col items-center justify-center">
                        <span className="text-base">게시물이 없습니다.</span>
                    </div>
                ) : (
                    <div className="flex w-full flex-col">
                        <div className="mb-4 grid w-full grid-cols-2 gap-2.5">
                            {communityData.map((item: any) => (
                                <PostTile
                                    key={item.id}
                                    item={item}
                                    onClick={() => onClickHandler({ postId: item.id })}
                                />
                            ))}
                        </div>
                        <div className="flex w-full justify-center">
                            <Pagination itemsCountPerPage={pageSize} totalItemsCount={totalCount} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
