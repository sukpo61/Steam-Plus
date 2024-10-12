'use client';

import { API_COMMENT_KEY } from '@/actions/queryKeys';
import { ChatInput } from '@/components/ui/ChatInput';
import { Input } from '@/components/ui/Input';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// import { ChatInput } from '@/components/chat/chat-input';

interface ChannelProps {
    data?: any;
}

export const Channel = () => {
    // const { fetchNextPage, hasNextPage, data, refetch, isPending } = useSuspenseInfiniteQuery({
    //     queryKey: [API_COMMENT_KEY],
    //     queryFn: () => {},
    //     initialPageParam: null,
    //     getNextPageParam: ({}) => {
    //         return null;
    //     },
    // });

    return (
        <div className="flex h-full w-full flex-col pr-1 pt-1">
            <div className="thumb-bg thumb-lg flex w-full flex-1 basis-0 flex-col-reverse gap-4 overflow-y-scroll pl-3 pr-1"></div>
            <div className="flex w-full px-3 pb-6">
                <ChatInput />
            </div>
        </div>
    );
};
