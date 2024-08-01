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
    multiple?: boolean;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    images: ImageInputValue[];
    imageMaxlength?: number;
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
const TextAreaContainer = styled.div`
    display: flex;
    flex: 1;
`;
const ImageListContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 16px;
`;

const TextImageInput = (props: TextImageInputProps) => {
    const {
        cancle,
        errorMessage,
        register,
        placeholder,
        images,
        setValue,
        multiple,
        imageMaxlength = 1,
    } = props;

    const getImageSource = useCallback((src: File | string) => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, []);

    const imageList = images?.map((image) => {
        return {
            id: image.id,
            src: getImageSource(image.src),
        };
    });

    const onClose = (id: string) => {
        const result = images.filter((i) => i.id !== id);
        setValue('images', result);
    };

    return (
        <Container>
            <TextAreaContainer>
                <TextArea placeholder={placeholder} {...register('content')} />
            </TextAreaContainer>
            <ImageListContainer>
                {imageList.map((image) => (
                    <ImagePreview key={image.id} image={image} onClose={() => onClose(image.id)} />
                ))}
            </ImageListContainer>
            <SubmitButtonContainer>
                <ImageInput
                    onChange={(e) => setValue('images', e)}
                    value={images}
                    maxLength={imageMaxlength}
                    multiple={multiple}
                    replaceable
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
