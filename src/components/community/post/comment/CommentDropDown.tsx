'use client';

import styled from '@emotion/styled';
import { Text } from '@/components/ui/Text';
import { ReactNode } from 'react';
import { Typo } from 'styles/Typography';

export interface CommentDropDownProps {
    data: {
        id: string;
        label: string;
        icon: ReactNode;
        onClick: () => void;
    }[];
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: var(--darkGrey);
    border-radius: 8px;
    overflow: hidden;
`;
const Option = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 10px;
    &:hover {
        background: var(--Grey);
    }
`;
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const CommentDropDown = ({ data }: CommentDropDownProps) => {
    return (
        <Container>
            {data.map(({ id, label, icon, onClick }) => (
                <Option key={id} onClick={onClick}>
                    <IconContainer>{icon}</IconContainer>
                    <Text text={label} typo={Typo.Body.Body2Regular} />
                </Option>
            ))}
        </Container>
    );
};

export default CommentDropDown;
