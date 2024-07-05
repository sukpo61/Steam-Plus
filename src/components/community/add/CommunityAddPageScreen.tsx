'use client';

import styled from '@emotion/styled';
import CommunityTitle from '@components/community/CommunityTitle';
import { CommunitySearchParams } from 'types/searchParams/community';
import { Text } from '@components/ui/Text';
import Input from '@components/ui/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postCommunityDetail from 'src/api/community/detail/postCommunityDetail';
import { API_GET_COMMUNITY_LIST_KEY } from 'src/api/community/getCommunityList';
import TextArea from '@components/ui/TextArea';
import Select from '@components/ui/Select';

interface CommunityAddPageScreenProps {
    searchParams: CommunitySearchParams;
}

export interface SearchFormValue {
    title: string;
    category: string;
    content: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%; // 화면 전체 높이로 설정
    overflow-y: auto; // scroll 대신 auto 사용
    padding: 80px 20px 0;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 948px;
    width: 100%;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #00b8c8;
    padding: 16px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    padding: 16px 0;
`;
const TextAreaContainer = styled.div`
    display: flex;
    width: 100%;
    height: 500px;
`;

const AddButton = styled.button`
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    width: 60px;
    height: 30px;
    background: #00b8c8;
    border-radius: 8px;
    color: white;
`;

const CommunityAddPageScreen = ({ searchParams }: CommunityAddPageScreenProps) => {
    const queryCache = useQueryClient();
    const { mutate: postMutate } = useMutation({
        mutationFn: postCommunityDetail,
    });

    const { register, handleSubmit } = useForm<SearchFormValue>({
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onSubmit: SubmitHandler<SearchFormValue> = useCallback((data) => {
        if (!data.title) {
            alert('제목을 입력하세요.');
            return;
        }

        if (!data.content) {
            alert('내용을 입력하세요.');
            return;
        }

        postMutate(
            { ...data },
            {
                onSuccess: async () => {
                    await queryCache.invalidateQueries({ queryKey: [API_GET_COMMUNITY_LIST_KEY] });
                },
            },
        );
    }, []);

    const selectData = [
        {
            id: 'free',
            label: '자유',
        },
        {
            id: 'recruit',
            label: '모집',
        },
    ];

    return (
        <Container>
            <CommunityTitle />
            <Main>
                <Header>
                    <Text text="게시글 작성" size={20} />
                    <AddButton onClick={handleSubmit(onSubmit)}>글쓰기</AddButton>
                </Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <Text text="제목" size={14} />
                        <Input placeholder="제목을 입력하세요." {...register('title')} />
                    </InputContainer>
                    <InputContainer>
                        <Text text="카테고리" size={14} />
                        <Select data={selectData} {...register('category')} />
                    </InputContainer>
                    <InputContainer>
                        <Text text="제목" size={14} />
                        <TextAreaContainer>
                            <TextArea placeholder="내용을 입력하세요." {...register('content')} />
                        </TextAreaContainer>
                    </InputContainer>
                </Form>
            </Main>
        </Container>
    );
};

export default CommunityAddPageScreen;
