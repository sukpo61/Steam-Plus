'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import DefaultProfileThumbnail from 'public/images/profile/profile.png';
import { timeFormat } from '@utils/timeFormat';
import { deletePost } from 'src/api/community/post/apiPost';
import { getPost } from 'src/api/community/post/apiPost';
import { Text } from '@components/ui/Text';
import { Button } from '@components/ui/Button';
import { Typo } from 'styles/Typography';
import { useRouter } from 'next/navigation';
import { useSuspenseQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { API_Post_KEY } from 'src/api/community/communityQueryKey';
import { API_COMMUNITY_LIST_KEY } from 'src/api/community/communityQueryKey';
import { PostParams } from 'types/params/community';

interface PostProps {
    params: PostParams;
}

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
const PostImage = styled(Image)`
    object-fit: cover;
    border-radius: 8px;
    height: auto !important;
`;

const Post = ({ params }: PostProps) => {
    const { channelId, postId } = params;
    const { push, replace } = useRouter();
    const queryCache = useQueryClient();

    const { data } = useSuspenseQuery({
        queryKey: [API_Post_KEY, params],
        queryFn: () => getPost({ params }),
    });

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deletePost,
    });

    const deleteHandler = () => {
        const userConfirmed = window.confirm('정말 삭제하시겠습니까?');
        if (userConfirmed) {
            deleteMutate(
                { params },
                {
                    onSuccess: async () => {
                        await queryCache.invalidateQueries({
                            queryKey: [API_COMMUNITY_LIST_KEY],
                        });
                        replace('/community');
                    },
                },
            );
        }
    };

    const editHandler = () => {
        push(`/community/${channelId}/post/${postId}`);
    };

    if (!data) {
        return (
            <Container>
                <Text text={'게시물이 없습니다.'} />
            </Container>
        );
    }

    const { title, createdAt, viewcount, content, images } = data;

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
                            <Text text={'username'} typo={Typo.Body.Body2Bold} />
                            <UserMeta>
                                <Text text={timeFormat(createdAt)} typo={Typo.Body.Body3Regular} />
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
                        {images.map(({ id, src }: any) => (
                            <PostImage
                                key={id}
                                src={src}
                                alt="Postimage"
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

export default Post;
