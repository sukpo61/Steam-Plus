'use client';

import styled from '@emotion/styled';
import { Text } from './Text';
import { Button } from './Button';
import { Typo } from 'styles/Typography';
import ImageInput from './ImageInput';
import TextArea from './TextArea';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useCallback } from 'react';
import ImagePreview from './ImagePreview';
import { ImageInputValue } from './ImageInput';

export interface TextImageInputProps {
    cancle?: () => void;
    errorMessage?: string;
    placeholder?: string;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    image: ImageInputValue[];
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 12px 12px 6px 12px;
    background-color: #263245;
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
`;
const ImageListContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 16px;
`;

const TextImageInput = ({
    cancle,
    errorMessage,
    register,
    placeholder,
    image,
    setValue,
}: TextImageInputProps) => {
    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const imageList = image?.map((image) => {
        return {
            id: image.id,
            src: getImageSource(image.src),
        };
    });

    const onClose = (id: string) => {
        const result = image.filter((i) => i.id !== id);
        setValue('image', result);
    };

    return (
        <Container>
            <TextArea
                placeholder={placeholder}
                {...register('content', {
                    required: true,
                    pattern: {
                        value: /\S+/,
                        message: '내용을 입력하세요',
                    },
                })}
            />
            <ImageListContainer>
                {imageList.map((image) => (
                    <ImagePreview key={image.id} image={image} onClose={() => onClose(image.id)} />
                ))}
            </ImageListContainer>
            <SubmitButtonContainer>
                <ImageInput
                    onChange={(e) => setValue('image', e)}
                    value={image}
                    maxLength={1}
                    isChange
                />
                <ButtonContainer>
                    <Text text={errorMessage} typo={Typo.Error.Error1Regular} />
                    {cancle && (
                        <Button text="취소" buttonType="comment" type="button" onClick={cancle} />
                    )}
                    <Button text="등록" buttonType="comment" />
                </ButtonContainer>
            </SubmitButtonContainer>
        </Container>
    );
};

export default TextImageInput;
