'use client';

import styled from '@emotion/styled';
import ToggleButton from './ToggleButton';
import { useState } from 'react';

interface ToggleButtonGroupProps {
    data: {
        label: string;
        id?: string;
    }[];
    onChange?: (id?: string) => void;
    activeId?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const BottomLine = styled.div`
    display: flex;
    width: 100%;
    height: 6px;
    background: var(--darkestGrey);
`;

const ToggleButtonGroup = ({ data, onChange, activeId }: ToggleButtonGroupProps) => {
    const handleClick = (id?: string) => {
        if (onChange) {
            onChange(id);
        }
    };

    return (
        <Container>
            <ButtonContainer>
                {data.map((item) => {
                    const { label, id } = item;
                    const selected = activeId === id;
                    return (
                        <ToggleButton
                            key={label}
                            label={label}
                            selected={selected}
                            onClick={() => handleClick(id)}
                        />
                    );
                })}
            </ButtonContainer>
            <BottomLine />
        </Container>
    );
};

export default ToggleButtonGroup;
