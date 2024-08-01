'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import deleteCommunityDetail from 'src/api/community/detail/deleteCommunityDetail';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import getCommunityDetail from 'src/api/community/detail/getCommunityDetail';
import timeFormat from '@utils/timeFormat';
import { Text } from '@components/ui/Text';
import { Button } from '@components/ui/Button';
import { Typo } from 'styles/Typography';
import { useRouter } from 'next/navigation';
import { useSuspenseQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { API_COMMUNITY_DETAIL_KEY } from 'src/api/community/detail/getCommunityDetail';
import { API_GET_COMMUNITY_LIST_KEY } from 'src/api/community/getCommunityList';
import { CommunityDetailParams } from 'types/params/community';

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Container = styled.div`
    display: flex;
    background: var(--Gradient-Background);
    flex-direction: column;
    align-items: start;
    max-width: 948px;
    width: 100%;
    padding: 16px 32px;
`;

const PostTitle = styled.div`
    width: 100%;
    background: var(--systemDarkerGrey);
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
    background: var(--Background-Neutral-LightSofter);
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: var(--Grey);
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
    flex-direction: column;
    gap: 16px;
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 24px;
    word-break: break-word;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const CommunityDetailImage = styled(Image)`
    object-fit: cover;
    border-radius: 8px;
    height: auto !important;
`;

const CommunityDetail = ({ params }: CommunityDetailParams) => {
    const { id } = params;

    const { data } = useSuspenseQuery({
        queryKey: [API_COMMUNITY_DETAIL_KEY, params],
        queryFn: () => getCommunityDetail({ params }),
    });

    if (!data) {
        return;
    }

    const queryCache = useQueryClient();
    const { push, replace } = useRouter();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteCommunityDetail,
    });

    const { title, username = 'user', timestamp, viewcount, content, images } = data;

    const deleteHandler = () => {
        const userConfirmed = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirmed) {
            deleteMutate(
                { params },
                {
                    onSuccess: async () => {
                        await queryCache.invalidateQueries({
                            queryKey: [API_GET_COMMUNITY_LIST_KEY],
                        });
                        replace('/community');
                    },
                },
            );
        }
    };

    const editHandler = () => {
        push(`/community/${id}/edit`);
    };

    return (
        <>
            <PostTitle>
                <Text text={title} typo={Typo.Title.Header2Regular} preLine />
            </PostTitle>
            <Container>
                <Header>
                    <ProfileContainer>
                        <ProfileImage alt="profile_image" src={DefaultProfileThumbnail} />
                        <UserDetails>
                            <Text text={username} typo={Typo.Body.Body2Bold} />
                            <UserMeta>
                                <Text text={timeFormat(timestamp)} typo={Typo.Body.Body3Regular} />
                                <Text text={String(viewcount)} typo={Typo.Body.Body3Regular} />
                            </UserMeta>
                        </UserDetails>
                    </ProfileContainer>
                    <ActionButtons>
                        <Button text="수정" onClick={editHandler} />
                        <Button text="삭제" onClick={deleteHandler} />
                    </ActionButtons>
                </Header>
                <PostContent>
                    <ImageContainer>
                        {images.map(({ id, src }) => (
                            <CommunityDetailImage
                                key={id}
                                src={src}
                                alt="communitydetailimage"
                                width={500}
                                height={100}
                            />
                        ))}
                    </ImageContainer>
                    <TextContainer>
                        <Text text={content} typo={Typo.Body.Body1Regular} preLine={true} />
                    </TextContainer>
                </PostContent>
                <Divider />
            </Container>
        </>
    );
};

export default CommunityDetail;
