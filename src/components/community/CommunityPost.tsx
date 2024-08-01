'use client';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import timeFormat from '@utils/timeFormat';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { Text } from '@components/ui/Text';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { COMMUNIY_CATEGORY_LABEL } from './CommunityPageScreen';
import { useRouter } from 'next/navigation';
import { Typo } from 'styles/Typography';
import { useState } from 'react';

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

const ContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 1;
    width: 100%;
    gap: 8px;
`;

const ImageTitle = css`
    background: var(--darkGrey-opacity);
`;

const TitleContainer = styled.div<{ isImageTitle: boolean }>`
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    width: 100%;
    z-index: 999;
    ${({ isImageTitle }) => isImageTitle && ImageTitle};
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
    min-height: 70px;
    border-top: 2px solid var(--darkGrey);
    display: flex;
    justify-content: space-between;
    padding: 16px;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 8px;
    margin-top: 56px;
    padding: 0 16px;
`;

const PostImage = styled(Image)`
    object-fit: cover;
`;

const ImageWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
`;
const ImageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 6px;
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
        images,
    } = item;
    const { push } = useRouter();
    const [isTitle, setIsTitle] = useState(images?.length === 0);

    const onClickHandler = () => {
        push(`community/${id}`);
    };

    const handleMouseEnter = () => {
        if (images.length !== 0) setIsTitle(true);
    };

    const handleMouseLeave = () => {
        if (images.length !== 0) setIsTitle(false);
    };

    return (
        <Container
            onClick={onClickHandler}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <BorderTop />
            <ContentContainer>
                {isTitle && (
                    <TitleContainer isImageTitle={images?.length !== 0}>
                        <Text text={title} typo={Typo.Title.Header3Regular} />
                        <Text
                            text={`${COMMUNIY_CATEGORY_LABEL.find((item) => item.id === category)?.label}`}
                            typo={Typo.Body.Body2Regular}
                        />
                    </TitleContainer>
                )}
                {images.length !== 0 ? (
                    <ImageContainer>
                        <ImageWrap>
                            <PostImage
                                key={images[0].id}
                                src={images[0].src}
                                alt="communitydetailimage"
                                fill
                            />
                        </ImageWrap>
                    </ImageContainer>
                ) : (
                    <TextContainer>
                        <Text text={timeFormat(timestamp)} typo={Typo.Body.Body2Regular} />
                        <Text text={content} preLine />
                    </TextContainer>
                )}
            </ContentContainer>
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
