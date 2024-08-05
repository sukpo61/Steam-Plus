'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import DropDown from '@components/ui/DropDown';
import CommentDropDown from './CommentDropDown';
import EditIcon from '@components/icons/common/Edit.icon';
import DeleteIcon from '@components/icons/common/Delete.icon';
import LikeIcon from '@components/icons/common/Like.icon';
import deleteComment from 'src/api/community/comment/deleteComment';
import CommentInput from './CommentInput';
import patchComment from 'src/api/community/comment/patchComment';
import { timeFormat } from '@utils/timeFormat';
import { Text } from '@components/ui/Text';
import { useState } from 'react';
import { Typo } from 'styles/Typography';
import { useRecoilState } from 'recoil';
import { isCommentDropDownRecoil } from 'src/recoil-states/commentState';
import { API_Post_COMMENT_KEY } from 'src/api/community/communityQueryKey';
import { API_Post_COMMENT_REPLY_KEY } from 'src/api/community/communityQueryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@components/ui/Button';
import { CommentResponse } from 'types/community/comment';
import { CommentParams } from 'types/params/community';

export interface CommentProps {
    params: CommentParams;
    item: CommentResponse;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: start;
    gap: 16px;
    margin-bottom: 24px;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const InputContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 24px;
`;

const CommentDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
`;

const ProfileImage = styled(Image)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;
`;

const UserMeta = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 13px;
    gap: 6px;
`;
const Time = styled.div`
    display: flex;
    min-width: 86px;
`;

const CommentImage = styled(Image)`
    object-fit: cover;
    border-radius: 8px;
    height: auto !important;
`;

const userId = '1234';

const Comment = ({ item, params }: CommentProps) => {
    const { postId, commentId, replyId } = params;
    const { id, content, username = 'user', createdAt, images, likes } = item;
    const [isReplyInput, setIsReplyInput] = useState(false);
    const [openId, setOpenId] = useRecoilState(isCommentDropDownRecoil);
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
            queryKey: [API_Post_COMMENT_KEY, { postId }],
        });
        if (replyId)
            await queryCache.invalidateQueries({
                queryKey: [API_Post_COMMENT_REPLY_KEY, { postId, commentId }],
            });
    };

    const likeOnClickHandler = () => {
        const isLike = likes.includes(userId);
        // patchLike(
        //     { params: { ...params, id }, data: { like: userId }, isLike: { value: !isLike } },
        //     {
        //         onSuccess: onSuccess,
        //     },
        // );
    };

    const deleteHandler = () => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        if (!userConfirm) {
            return;
        }
        deleteMutate(
            { params: { ...params, id } },
            {
                onSuccess: onSuccess,
            },
        );
    };

    const editHandler = () => {
        setIsEdit(true);
        setOpenId(null);
    };

    const dropdownmenu = [
        {
            id: 'delete',
            label: '삭제',
            icon: <DeleteIcon />,
            onClick: deleteHandler,
        },
        {
            id: 'edit',
            label: '편집',
            icon: <EditIcon />,
            onClick: editHandler,
        },
    ];

    const dropDownOnClickHandler = () => {
        setOpenId((prevId) => (prevId === id ? null : id));
    };

    return (
        <Container>
            <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
            {isEdit ? (
                <CommentInput
                    id={id}
                    params={params}
                    defaultValues={{ content, images }}
                    closeInput={() => setIsEdit(false)}
                />
            ) : (
                <CommentContainer>
                    <CommentDetailContainer>
                        <ProfileContainer>
                            <UserDetails>
                                <Text text={username} typo={Typo.Body.Body2Bold} />
                                <Text text={content} />
                                {images?.map(({ id, src }: any) => (
                                    <CommentImage
                                        key={id}
                                        src={src}
                                        alt="Postimage"
                                        width={200}
                                        height={100}
                                    />
                                ))}
                                <UserMeta>
                                    <Time>
                                        <Text
                                            text={timeFormat(createdAt, 'comment')}
                                            typo={Typo.Body.Body3Regular}
                                        />
                                    </Time>
                                    <Text
                                        text="답글쓰기"
                                        typo={Typo.Body.Body3Regular}
                                        underLine
                                        onClick={() => setIsReplyInput((e) => !e)}
                                    />
                                    <Button
                                        text={<LikeIcon isLike={likes.includes(userId)} />}
                                        buttonType="icon"
                                        onClick={likeOnClickHandler}
                                    />
                                    <Text text={likes.length} typo={Typo.Body.Body3Regular} />
                                </UserMeta>
                            </UserDetails>
                        </ProfileContainer>
                        <DropDown
                            isOpen={openId === id}
                            onClick={dropDownOnClickHandler}
                            component={<CommentDropDown data={dropdownmenu} />}
                        />
                    </CommentDetailContainer>
                    {isReplyInput && (
                        <InputContainer>
                            <CommentInput
                                id={id}
                                params={params}
                                closeInput={() => setIsReplyInput(false)}
                            />
                        </InputContainer>
                    )}
                </CommentContainer>
            )}
        </Container>
    );
};

export default Comment;
