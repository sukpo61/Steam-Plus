'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useState } from 'react';
import DropDownIcon from '@components/icons/common/DropDown.icon';
import { MouseEventHandler } from 'react';
import { MouseEvent } from 'react';

export interface DropDownProps {
    component: ReactNode;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isOpen?: boolean;
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
    left: 0;
`;
const IconContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    &:hover {
        background: var(--darkGrey);
    }
`;

const DropDown = ({ component, onClick, icon, isOpen: isOpenProp }: DropDownProps) => {
    const [isOpen, setisOpen] = useState(false);
    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        onClick ? onClick(event) : setisOpen((e) => !e);
    };
    const isOpenState = isOpenProp || isOpen;
    return (
        <Container>
            <IconContainer onClick={onClickHandler}>{icon || <DropDownIcon />}</IconContainer>
            {isOpenState && <DropDownContainer>{component}</DropDownContainer>}
        </Container>
    );
};

export default DropDown;
