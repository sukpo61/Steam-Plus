'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import Input from '@components/ui/Input';
import { useFormContext, useWatch } from 'react-hook-form';
import Select from '@components/ui/Select';
import { Typo } from 'styles/Typography';
import { Button } from '@components/ui/Button';
import { CommunityAddFormValue } from './CommunityAddController';
import TextImageInput from '@components/ui/TextImageInput';

interface CommunityAddPageScreenProps {
    params: {
        id?: string;
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    background: var(--Gradient-Background);
    padding: 32px;
    max-width: 948px;
    width: 100%;
    min-height: 100%;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid var(--dustyBlue);
    padding: 16px 0;
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

const CommunityAddPageScreen = ({ params }: CommunityAddPageScreenProps) => {
    const { id } = params;
    const { register, setValue, control } = useFormContext<CommunityAddFormValue>();

    const images = useWatch({ control, name: 'images' });

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
            <Main>
                <Header>
                    <Text
                        text={`게시글 ${id ? '수정' : '작성'}`}
                        typo={Typo.Title.Header2Regular}
                    />
                    <Button text="글쓰기" />
                </Header>
                <InputContainer>
                    <Text text="제목" />
                    <Input
                        placeholder="제목을 입력하세요."
                        {...register('title', {
                            required: '제목을 입력하세요',
                        })}
                    />
                </InputContainer>
                <InputContainer>
                    <Text text="카테고리" />
                    <Select data={selectData} {...register('category')} />
                </InputContainer>
                <InputContainer>
                    <Text text="제목" />
                    <TextAreaContainer>
                        <TextImageInput
                            placeholder="댓글을 입력하세요."
                            register={register}
                            setValue={setValue}
                            images={images || []}
                            imageMaxlength={5}
                            multiple
                        />
                    </TextAreaContainer>
                </InputContainer>
            </Main>
        </Container>
    );
};

export default CommunityAddPageScreen;
