'use client';

import styled from '@emotion/styled';
import timeFormat from '@utils/timeFormat';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import DropDown from '@components/ui/DropDown';
import CommentDropDown from './CommentDropDown';
import deleteCommunityDetailComment from 'src/api/community/comment/deleteCommunityDetailComment';
import EditIcon from '@components/icons/common/Edit.icon';
import DeleteIcon from '@components/icons/common/Delete.icon';
import CommunityDetailCommentInput from './CommunityDetailCommentInput';
import { Text } from '@components/ui/Text';
import { useState } from 'react';
import { Typo } from 'styles/Typography';
import { useRecoilState } from 'recoil';
import { isCommentDropDownRecoil } from 'src/recoil-states/commentState';
import { API_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import { API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY } from 'src/api/community/comment/reply/getCommunityDetailCommentReply';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CommunityDetailCommentProps {
    item: any;
    params: {
        postId: string;
        commentId?: string;
        replyId?: string;
    };
    type?: 'reply';
    dropdownmenu?: any;
    isEdit?: boolean;
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
    gap: 6px;
    align-items: start;
`;

const UserMeta = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
`;
const Time = styled.div`
    display: flex;
    min-width: 86px;
`;

const CommentImage = styled(Image)`
    object-fit: cover;
    border-radius: 4px;
`;

const CommunityDetailComment = ({ item, params }: CommunityDetailCommentProps) => {
    const { postId, commentId } = params;
    const { id, content, username = 'user', timestamp, image } = item;
    const [isReplyInput, setIsReplyInput] = useState(false);
    const [openId, setOpenId] = useRecoilState(isCommentDropDownRecoil);
    const [isEdit, setIsEdit] = useState(false);
    const queryCache = useQueryClient();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteCommunityDetailComment,
    });

    const deleteHandler = () => {
        const userConfirm = window.confirm('정말 삭제하시겠습니까?');
        if (!userConfirm) {
            return;
        }
        const onSuccess = async () => {
            await queryCache.invalidateQueries({
                queryKey: [API_COMMUNITY_DETAIL_COMMENT_KEY, { postId }],
            });
            await queryCache.invalidateQueries({
                queryKey: [API_COMMUNITY_DETAIL_COMMENT_REPLY_KEY, { postId, commentId }],
            });
        };
        deleteMutate(
            { id, params },
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
                <CommunityDetailCommentInput
                    id={id}
                    params={params}
                    defaultValues={{ content, image }}
                    closeInput={() => setIsEdit(false)}
                />
            ) : (
                <CommentContainer>
                    <CommentDetailContainer>
                        <ProfileContainer>
                            <UserDetails>
                                <Text text={username} typo={Typo.Body.Body2Bold} />
                                {image &&
                                    image.map(({ id, src }: any) => (
                                        <CommentImage
                                            key={id}
                                            src={src}
                                            alt="communitydetailimage"
                                            width={200}
                                            height={200}
                                        />
                                    ))}
                                <Text text={content} />
                                <UserMeta>
                                    <Time>
                                        <Text
                                            text={timeFormat(timestamp, 'comment')}
                                            typo={Typo.Body.Body3Regular}
                                        />
                                    </Time>
                                    <Text
                                        text="답글쓰기"
                                        typo={Typo.Body.Body3Regular}
                                        underLine
                                        onClick={() => setIsReplyInput((e) => !e)}
                                    />
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
                            <CommunityDetailCommentInput
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

export default CommunityDetailComment;
