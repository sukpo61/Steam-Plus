'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useState } from 'react';
import DropDownIcon from '@components/icons/common/DropDown.icon';

export interface DropDownProps {
    component?: ReactNode;
}

const Container = styled.div`
    position: relative;
    display: flex;
`;
const DropDownContainer = styled.div`
    position: absolute;
    display: flex;
    z-index: 999;
    top: 36px;
    right: 0;
`;
const IconContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    &:hover {
        background: var(--gpStoreDarkGrey);
    }
`;

const DropDown = ({ component }: DropDownProps) => {
    const [isOpen, setisOpen] = useState(false);
    return (
        <Container>
            <IconContainer
                onClick={() => {
                    setisOpen((e) => !e);
                }}
            >
                <DropDownIcon />
            </IconContainer>
            {isOpen && <DropDownContainer>{component}</DropDownContainer>}
        </Container>
    );
};

export default DropDown;
