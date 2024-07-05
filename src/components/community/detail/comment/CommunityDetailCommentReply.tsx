'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import timeFormat from '@utils/timeFormat';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { ColorToken } from 'styles/Color';
import { useState } from 'react';
import { Button } from '@components/ui/Button';

export interface CommunityDetailCommentReplyProps {
    item: any;
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 32px;
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

const CommunityDetailCommentReply = ({ item }: CommunityDetailCommentReplyProps) => {
    const { id, comment, username = 'user', timestamp } = item;
    const { push } = useRouter();
    const [isReply, setIsReply] = useState();

    return (
        <Container>
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
                        <Text
                            text="답글쓰기"
                            size={13}
                            color={ColorToken.grey}
                            onClick={() => {}}
                        />
                    </UserMeta>
                </UserDetails>
            </ProfileContainer>
            <ActionButtons>
                <Button text="수정" />
                <Button text="삭제" />
            </ActionButtons>
        </Container>
    );
};

export default CommunityDetailCommentReply;
