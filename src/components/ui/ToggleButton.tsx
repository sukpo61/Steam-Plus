'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import { MouseEventHandler } from 'react';

export interface ToggleButtonProps {
    label: string;
    selected: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Container = styled.button<{ selected?: boolean }>`
    display: flex;
    min-width: 80px;
    height: 40px;
    padding: 1px;
    background: ${({ selected }) => selected && 'var(--Gradient-ToggleButtonBorder)'};
`;
const TextContainer = styled.div<{ selected?: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    justify-content: center;
    align-items: center;
    background: ${({ selected }) => selected && 'var(--darkestGrey)'};
`;

const ToggleButton = ({ onClick, label, selected }: ToggleButtonProps) => {
    return (
        <Container onClick={onClick} selected={selected}>
            <TextContainer selected={selected}>
                <Text text={label} />
            </TextContainer>
        </Container>
    );
};

export default ToggleButton;
