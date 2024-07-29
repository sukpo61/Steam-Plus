import styled from '@emotion/styled';
import useToast from '@hooks/useToast';
import { ChangeEventHandler, FC, useCallback, useRef } from 'react';
import { Button } from './Button';
import CameraIcon from '@components/icons/common/Camera.icon';

export interface ImageInputValue {
    id: string;
    src: File | string;
}

interface ImageInputProps {
    value: ImageInputValue[];
    onChange: (value: ImageInputValue[]) => void;
    maxLength: number;
    isChange?: boolean;
}

const Container = styled.label`
    display: flex;
`;

const CusttomInput = styled.input`
    display: none;
`;

const ImageInput: FC<ImageInputProps> = ({ value, maxLength, onChange, isChange }) => {
    const { showToast } = useToast();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onChangeImageInput = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const { files } = event.currentTarget;
            if (!files) return;
            let sizeError = false;
            const newValues: ImageInputValue[] = [];
            for (let i = 0; i < files.length; i += 1) {
                const file = files.item(i);

                if (file) {
                    if (file.size <= 104857600) {
                        newValues.unshift({
                            id: crypto.randomUUID(),
                            src: file,
                        });
                    } else {
                        sizeError = true;
                    }
                }
            }

            let result: ImageInputValue[] = [...value];

            if (isChange) {
                result = [...newValues, ...result];
                if (maxLength - 1 < value.length) {
                    result.splice(-files.length);
                }
            } else {
                if (maxLength - 1 < result.length) {
                    showToast('최대 등록 사진 개수 초과입니다.');
                } else {
                    result = [...newValues, ...result];
                }
            }

            onChange(result);
            event.currentTarget.value = '';

            if (sizeError) {
                showToast('사진이 100MB 제한을 초과했어요.');
            }
        },
        [maxLength, onChange, showToast, value],
    );

    const onClickHandler = () => {
        inputRef.current?.click();
    };

    return (
        <Container>
            <CusttomInput
                type="file"
                accept="image/*"
                multiple
                onChange={onChangeImageInput}
                ref={inputRef}
            />
            <Button
                type="button"
                text={<CameraIcon />}
                buttonType="icon"
                onClick={onClickHandler}
            />
        </Container>
    );
};

export default ImageInput;
