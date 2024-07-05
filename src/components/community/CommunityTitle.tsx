'use client';

import styled from '@emotion/styled';
import { Text } from '@components/ui/Text';
import { ColorToken } from 'styles/Color';

export interface CommunityTitleProps {
    title?: string;
    info?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
`;

const CommunityTitle = (data: CommunityTitleProps) => {
    const {
        title = '커뮤니티',
        info = '게임채널에 함께할 구성원을 모집하거나 자유롭게 의견을 나누는 공간입니다.',
    } = data;

    return (
        <Container>
            <Text text={title} size={40} weight={700} />
            <Text text={info} size={14} color={ColorToken.grey} />
        </Container>
    );
};

export default CommunityTitle;
