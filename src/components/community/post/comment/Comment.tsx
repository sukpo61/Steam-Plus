'use client';

import { deleteComment, patchComment } from '@/actions/community/comment';
import { API_COMMENT_KEY } from '@/actions/queryKeys';
import { UserAvatar } from '@/components/common/UserAvatar';
import { DeleteIcon } from '@/components/icons/common/Delete.icon';
import { DropDownIcon } from '@/components/icons/common/DropDown.icon';
import { EditIcon } from '@/components/icons/common/Edit.icon';
import { Button } from '@/components/ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { timeFormat } from '@/utils/timeFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { CommentResponse } from 'types/community/comment';
import { CommentParams } from 'types/params/community';
import { CommentInput } from './CommentInput';
export interface CommentProps {
    params: CommentParams;
    item: CommentResponse;
}

export const Comment = ({ item, params }: CommentProps) => {
    const { postId } = params;
    const { id, content, username = 'user', createdAt, images, isOwned } = item;
    const [isReplyInput, setIsReplyInput] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const queryCache = useQueryClient();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteComment,
    });

    const { mutate: patchLike } = useMutation({
        mutationFn: patchComment,
    });

    const onSuccess = async () => {
        await queryCache.invalidateQueries({
            queryKey: [API_COMMENT_KEY, { postId }],
        });
    };

    const deleteHandler = () => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        if (!userConfirm) {
            return;
        }
        deleteMutate(
            { params },
            {
                onSuccess: onSuccess,
            },
        );
    };

    const editHandler = () => {
        setIsEdit(true);
    };

    return (
        <div className="mb-6 flex w-full flex-row items-start gap-4">
            <div className="flex pt-0.5">
                <UserAvatar className="h-9 w-9" />
            </div>
            {isEdit ? (
                <CommentInput
                    id={id}
                    params={params}
                    defaultValues={{ content, images }}
                    closeInput={() => setIsEdit(false)}
                />
            ) : (
                <div className="flex w-full flex-col">
                    <div className="flex w-full items-start justify-between">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-sm">{username}</span>
                                <span className="pre-wrap mb-1 text-base">{content}</span>
                                {images?.map(({ id, src }: any) => (
                                    <Image
                                        key={id}
                                        src={src}
                                        alt="Postimage"
                                        width={200}
                                        height={100}
                                        className="mb-3 rounded-lg object-cover"
                                    />
                                ))}

                                <div className="flex max-h-[13px] flex-row items-center gap-2">
                                    <div className="flex min-w-[86px]">
                                        <span className="text-sm">
                                            {timeFormat(createdAt, 'comment')}
                                        </span>
                                    </div>
                                    <span
                                        className="cursor-pointer text-sm hover:underline"
                                        onClick={() => setIsReplyInput((e) => !e)}
                                    >
                                        답글쓰기
                                    </span>
                                </div>
                            </div>
                        </div>
                        {isOwned && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        className="hover:bg-primary-bright"
                                        variant={'trans'}
                                        size={'iconround'}
                                    >
                                        <DropDownIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem onClick={editHandler}>
                                            <EditIcon />
                                            <span>수정</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={deleteHandler}>
                                            <DeleteIcon />
                                            <span>삭제</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenuPortal>
                            </DropdownMenu>
                        )}
                    </div>
                    {isReplyInput && (
                        <div className="mt-6 flex w-full">
                            <CommentInput
                                id={id}
                                params={params}
                                closeInput={() => setIsReplyInput(false)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
