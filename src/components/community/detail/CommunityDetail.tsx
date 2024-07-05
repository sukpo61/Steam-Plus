'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { ColorToken } from 'styles/Color';
import { Button } from '@components/ui/Button';
import timeFormat from '@utils/timeFormat';
import { useSuspenseQuery } from '@tanstack/react-query';
import getCommunityDetail from 'src/api/community/detail/getCommunityDetail';
import { API_GET_COMMUNITY_DETAIL_KEY } from 'src/api/community/detail/getCommunityDetail';

interface CommunityDetailProps {
    params: {
        id: string;
    };
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Container = styled.div`
    display: flex;
    background: var(--gpGradient-StoreBackground);
    flex-direction: column;
    align-items: start;
    max-width: 948px;
    width: 100%;
    padding: 16px 32px;
`;

const PostTitle = styled.div`
    width: 100%;
    background: var(--gpSystemDarkerGrey);
    height: 100px;
    display: flex;
    padding: 32px;
`;
const ProfileImage = styled(Image)`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

const Header = styled.div`
    width: 100%;
    padding: 16px;
    background: var(--gpBackground-Neutral-LightSofter);
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: var(--gpStoreGrey);
    margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const ActionButtons = styled.div`
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

const PostContent = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 24px;
    word-break: break-word;
`;

const CommunityDetail = ({ params }: CommunityDetailProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_GET_COMMUNITY_DETAIL_KEY, params],
        queryFn: () => getCommunityDetail(params),
    });

    if (!data) {
        return;
    }

    const { title, username = 'user', timestamp, viewcount, content } = data;

    return (
        <>
            <PostTitle>
                <Text text={title} size={26} preLine={true} color="white" />
            </PostTitle>
            <Container>
                <Header>
                    <ProfileContainer>
                        <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
                        <UserDetails>
                            <Text text={username} size={13} weight={600} />
                            <UserMeta>
                                <Text
                                    text={timeFormat(timestamp)}
                                    size={12}
                                    color={ColorToken.grey}
                                />
                                <Text text={String(viewcount)} size={12} color={ColorToken.grey} />
                            </UserMeta>
                        </UserDetails>
                    </ProfileContainer>
                    <ActionButtons>
                        <Button text="수정" />
                        <Button text="삭제" />
                    </ActionButtons>
                </Header>
                <PostContent>
                    <Text text={content} size={15} preLine={true} />
                </PostContent>
                <Divider />
            </Container>
        </>
    );
};

export default CommunityDetail;
