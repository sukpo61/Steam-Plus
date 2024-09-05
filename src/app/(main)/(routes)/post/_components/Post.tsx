'use client';

import { deletePost, getPost } from '@/actions/community/post';
import { API_COMMUNITY_KEY, API_POST_KEY } from '@/actions/queryKeys';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { useBgStore } from '@/store/useBgStore';
import { timeFormat } from '@/utils/timeFormat';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    const { postId } = params;
    const { push, replace } = useRouter();
    const { setBackground } = useBgStore((state) => state);
    const queryCache = useQueryClient();

    const { data } = useSuspenseQuery({
        queryKey: [API_POST_KEY, params],
        queryFn: () => getPost({ params }),
    });

    const { title, createdAt, viewCount, content, images, isOwned, appId, appData, user } = data;
    const { name: appName, header_image, background } = appData;
    const { name: userName, avatar } = user;

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deletePost,
    });

    const editHandler = () => {
        push(`/post/${postId}/edit`);
    };

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
                        replace(`/community/${appId}`);
                    },
                },
            );
        }
    };

    useEffect(() => {
        if (appId && background) {
            setBackground({ appId, background });
        }
    }, [background]);

    return (
        <>
            <div className="flex h-[100px] w-full items-center justify-between bg-primary-dark p-8">
                <span className="text-3xl">{title}</span>
                <span className="text-xl">{appName}</span>
            </div>
            <div className="flex w-full max-w-[948px] flex-col items-start bg-primary px-8 pt-4">
                <div className="mb-4 flex w-full gap-4 bg-primary">
                    <div className="flex flex-1 flex-col">
                        <div className="mb-8 flex w-full justify-between bg-primary-bright/30 p-4">
                            <div className="flex items-center gap-4">
                                <UserAvatar src={avatar} className="h-9 w-9" />
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-base">{userName}</span>
                                    <div className="flex gap-1">
                                        <span className="text-sm">{timeFormat(createdAt)}</span>
                                        <span className="text-sm">{String(viewCount)}</span>
                                    </div>
                                </div>
                            </div>
                            {isOwned && (
                                <div className="flex items-center gap-4">
                                    <Button onClick={editHandler}>수정</Button>
                                    <Button onClick={deleteHandler}>삭제</Button>
                                </div>
                            )}
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
                    </div>
                    <div className="flex flex-col">
                        <div className="relative w-[240px]">
                            <Image
                                key={appId}
                                src={header_image}
                                alt="Postimage"
                                width={240}
                                height={0}
                            />
                        </div>
                        <div className="flex flex-col bg-primary-dark p-2">
                            <span
                                onClick={() => push(`/community/${appId}`)}
                                className="cursor-pointer rounded-md p-2 text-base hover:bg-primary"
                            >
                                커뮤니티 페이지
                            </span>
                            <span
                                onClick={() => push(`/app/${appId}`)}
                                className="cursor-pointer rounded-md p-2 text-base hover:bg-primary"
                            >
                                채널 리스트
                            </span>
                        </div>
                    </div>
                </div>
                <Separator />
            </div>
        </>
    );
};

export default Post;
