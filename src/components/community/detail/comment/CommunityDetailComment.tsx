'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import timeFormat from '@utils/timeFormat';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { ColorToken } from 'styles/Color';
import { useState } from 'react';
import CommunityDetailCommentReplyList from './CommunityDetailCommentReplyList';
import CommunityDetailCommentReplyInput from './CommunityDetailCommentReplyInput';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import { Button } from '@components/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteCommunityDetailComment from 'src/api/community/comment/deleteCommunityDetailComment';
import DropDown from '@components/ui/DropDown';
import CommentDropDown from './CommentDropDown';
import EditIcon from '@components/icons/common/Edit.icon';
import DeleteIcon from '@components/icons/common/Delete.icon';
import { API_GET_COMMUNITY_DETAIL_COMMENT_KEY } from 'src/api/community/comment/getCommunityDetailComment';
import { CommunitySearchParams } from 'types/searchParams/community';

export interface CommunityDetailCommentProps {
    item: any;
    searchParams: CommunitySearchParams;
    params: {
        id: string;
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
    margin-bottom: 24px;
`;
const CommentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
const ReplyContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    padding-left: 52px;
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

const ActionButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;
const ReplyButton = styled.div`
    margin-top: 16px;
    position: relative;
    left: -16px;
`;

const ReplyInputButton = styled.div`
    span {
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const CommunityDetailComment = ({ item, params, searchParams }: CommunityDetailCommentProps) => {
    const { id: postId } = params;
    const { id, comment, username = 'user', timestamp, subcollectionCount: ReplyCount } = item;
    const { push } = useRouter();
    const [isReplyInput, setIsReplyInput] = useState(false);
    const [isReply, setIsReply] = useState(false);

    const queryCache = useQueryClient();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteCommunityDetailComment,
    });

    const { mutate: editMutate } = useMutation({
        mutationFn: deleteCommunityDetailComment,
    });

    const deleteHandler = () => {
        deleteMutate(
            { id },
            {
                onSuccess: async () => {
                    await queryCache.invalidateQueries({
                        queryKey: [API_GET_COMMUNITY_DETAIL_COMMENT_KEY, params, searchParams],
                    });
                },
            },
        );
    };

    const editHandler = () => {
        editMutate(
            { id },
            {
                onSuccess: async () => {
                    await queryCache.invalidateQueries({
                        queryKey: [],
                    });
                },
            },
        );
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
            onClick: () => {},
        },
    ];

    return (
        <Container>
            <CommentContainer>
                <ProfileContainer>
                    <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
                    <UserDetails>
                        <Text text={username} size={14} weight={600} />
                        <Text text={comment} size={15} />
                        <UserMeta>
                            <Text
                                text={timeFormat(timestamp, 'comment')}
                                size={13}
                                color={ColorToken.grey}
                            />
                            <ReplyInputButton>
                                <Text
                                    text="답글쓰기"
                                    size={13}
                                    color={ColorToken.grey}
                                    onClick={() => {
                                        setIsReplyInput((e) => !e);
                                    }}
                                />
                            </ReplyInputButton>
                        </UserMeta>
                    </UserDetails>
                </ProfileContainer>
                <DropDown component={<CommentDropDown data={dropdownmenu} />} />
            </CommentContainer>
            <ReplyContainer>
                {isReplyInput && (
                    <CommunityDetailCommentReplyInput postId={postId} commentId={id} />
                )}
                {ReplyCount && (
                    <>
                        {isReply ? (
                            <QuerySuspenseErrorBoundary>
                                <CommunityDetailCommentReplyList postId={postId} commentId={id} />
                            </QuerySuspenseErrorBoundary>
                        ) : (
                            <ReplyButton>
                                <Button
                                    text={`답글 ${ReplyCount}개`}
                                    buttonType="reply"
                                    onClick={() => setIsReply((e) => !e)}
                                />
                            </ReplyButton>
                        )}
                    </>
                )}
            </ReplyContainer>
        </Container>
    );
};

export default CommunityDetailComment;
