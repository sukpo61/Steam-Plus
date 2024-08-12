'use client';

import { API_COMMUNITY_KEY } from '@/actions/community/community';
import { API_POST_KEY, deletePost, getPost } from '@/actions/community/post';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Text } from '@/components/ui/Text';
import { timeFormat } from '@/utils/timeFormat';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PostParams } from 'types/params/community';

interface PostProps {
    params: PostParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Post = ({ params }: PostProps) => {
    const { channelId, postId } = params;
    const { push, replace } = useRouter();
    const queryCache = useQueryClient();

    const { data } = useSuspenseQuery({
        queryKey: [API_POST_KEY, params],
        queryFn: () => getPost({ params }),
    });

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deletePost,
    });

    const deleteHandler = () => {
        const userConfirmed = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirmed) {
            deleteMutate(
                { params },
                {
                    onSuccess: async () => {
                        await queryCache.invalidateQueries({
                            queryKey: [API_COMMUNITY_KEY],
                        });
                        replace(`/community/${channelId}`);
                    },
                },
            );
        }
    };

    const editHandler = () => {
        push(`/community/${channelId}/post/${postId}/edit`);
    };

    if (!data) {
        return (
            <div className="flex w-full max-w-[948px] flex-col items-start">
                <Text text={'게시물이 없습니다.'} />
            </div>
        );
    }

    const { title, createdAt, viewCount, content, images } = data;

    return (
        <>
            <div className="flex h-[100px] w-full bg-primary-dark p-8">
                <span className="text-3xl">{title}</span>
            </div>
            <div className="flex w-full max-w-[948px] flex-col items-start bg-primary px-8 pt-4">
                <div className="mb-8 flex w-full justify-between bg-primary-bright/30 p-4">
                    <div className="flex items-center gap-4">
                        <UserAvatar className="h-9 w-9" />
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-base">username</span>
                            <div className="flex gap-1">
                                <span className="text-sm">{timeFormat(createdAt)}</span>
                                <span className="text-sm">{String(viewCount)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={editHandler}>수정</Button>
                        <Button onClick={deleteHandler}>삭제</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        {images.map(({ id, src }: any) => (
                            <Image
                                key={id}
                                src={src}
                                alt="Postimage"
                                width={500}
                                height={100}
                                className="rounded-lg"
                            />
                        ))}
                    </div>
                    <div className="mb-6 w-full">
                        <span className="pre-wrap text-base">{content}</span>
                    </div>
                </div>
                <Separator />
            </div>
        </>
    );
};

export default Post;
