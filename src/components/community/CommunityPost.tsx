'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import timeFormat from '@utils/timeFormat';
import { CommunityDetailResponse } from 'types/community/commnitydetail';
import { COMMUNIY_CATEGORY_LABEL } from './CommunityPageScreen';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { ColorToken } from 'styles/Color';

export interface CommunityPostProps {
    item: CommunityDetailResponse;
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 340px;
    background: var(--gpStoreDarkerGrey);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 1;
    &:hover {
        outline: 1px solid var(--gpColor-DustyBlue);
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

const Div1 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;
const Div2 = styled.div`
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
    border-top: 2px solid var(--gpStoreDarkGrey);
    display: flex;
    justify-content: space-between;
    padding: 16px;
`;

const CommunityPost = ({ item }: CommunityPostProps) => {
    const { id, category, title, content, username = 'user', timestamp, viewcount = 0 } = item;
    const { push } = useRouter();

    const onClickHandler = () => {
        push(`community/${id}`);
    };

    return (
        <Container onClick={onClickHandler}>
            <BorderTop />
            <CommentContainer>
                <TitleContainer>
                    <Text text={title} size={24} color="white" />
                    <Text
                        text={`${COMMUNIY_CATEGORY_LABEL.find((item) => item.id === category)?.label}`}
                        size={14}
                    />
                </TitleContainer>
                <Text text={timeFormat(timestamp)} size={14} />
                <Text text={content} preLine size={15} />
            </CommentContainer>
            <ProfileContainer>
                <Div1>
                    <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
                    <Text text={username} size={14} />
                </Div1>
                <Div2>
                    <Text text={String(viewcount)} size={14} />
                    <Text text={String(viewcount)} size={14} />
                </Div2>
            </ProfileContainer>
        </Container>
    );
};

export default CommunityPost;
