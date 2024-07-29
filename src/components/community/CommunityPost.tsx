'use client';

import styled from '@emotion/styled';
import timeFormat from '@utils/timeFormat';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { Text } from '@components/ui/Text';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { COMMUNIY_CATEGORY_LABEL } from './CommunityPageScreen';
import { useRouter } from 'next/navigation';
import { Typo } from 'styles/Typography';

export interface CommunityPostProps {
    item: CommunityDetailResponse;
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 340px;
    background: var(--darkerGrey);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 1;
    &:hover {
        outline: 1px solid var(--dustyBlue);
    }
`;

const BorderTop = styled.div`
    position: absolute;
    top: -1px;
    width: 100%;
    height: 1px;
    background: var(--Gradient-PostBorderTop);
    z-index: -1;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 1;
    width: 100%;
    padding: 16px;
    gap: 8px;
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
`;

const UserMeta = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;
const Info = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const ProfileImage = styled(Image)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;
const ProfileContainer = styled.div`
    width: 100%;
    border-top: 2px solid var(--darkGrey);
    display: flex;
    justify-content: space-between;
    padding: 16px;
`;

const CommunityPost = ({ item }: CommunityPostProps) => {
    const {
        id,
        category,
        title,
        content,
        username = 'user',
        timestamp,
        viewcount = 0,
        subcollectionCount: commentCount,
    } = item;
    const { push } = useRouter();

    const onClickHandler = () => {
        push(`community/${id}`);
    };

    return (
        <Container onClick={onClickHandler}>
            <BorderTop />
            <CommentContainer>
                <TitleContainer>
                    <Text text={title} typo={Typo.Title.Header3Regular} />
                    <Text
                        text={`${COMMUNIY_CATEGORY_LABEL.find((item) => item.id === category)?.label}`}
                        typo={Typo.Body.Body2Regular}
                    />
                </TitleContainer>
                <Text text={timeFormat(timestamp)} typo={Typo.Body.Body2Regular} />
                <Text text={content} preLine />
            </CommentContainer>
            <ProfileContainer>
                <UserMeta>
                    <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
                    <Text text={username} typo={Typo.Body.Body2Regular} />
                </UserMeta>
                <Info>
                    <Text
                        text={`댓글 ${commentCount || 0}`}
                        typo={Typo.Body.Body2Regular}
                        underLine
                    />
                    <Text text={`조회수 ${viewcount}`} typo={Typo.Body.Body2Regular} />
                </Info>
            </ProfileContainer>
        </Container>
    );
};

export default CommunityPost;
