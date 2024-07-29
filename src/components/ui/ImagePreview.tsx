import styled from '@emotion/styled';
import Image from 'next/image';
import CloseIcon from '@components/icons/common/Close.icon copy';
import { useMemo } from 'react';
import { ImageInputValue } from './ImageInput';

interface ImagePreviewProps {
    image: ImageInputValue;
    onClose?: () => void;
}

const Container = styled.div`
    position: relative;
    display: flex;
    width: 72px;
    height: 72px;
    border-radius: 4px;
    overflow: hidden;
`;
const IconContainer = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: var(--Background-Neutral-LightSofter);
    z-index: 99;
    border-radius: 50%;
`;

const PreviewImage = styled(Image)`
    object-fit: cover;
`;

const ImagePreview = ({ image, onClose }: ImagePreviewProps) => {
    const { src } = image;

    const ImageSource = useMemo(() => {
        if (typeof src === 'string') return src;
        return URL.createObjectURL(src);
    }, [src]);

    return (
        <Container>
            <IconContainer onClick={onClose}>
                <CloseIcon />
            </IconContainer>
            <PreviewImage src={ImageSource} alt="imagepreview" fill />
        </Container>
    );
};

export default ImagePreview;
