import React from 'react';
import styled from '@emotion/styled';
import { SteamAppDetailResponse } from 'types/steam/SteamAppDetailResponse';
import { Text } from '@components/ui/Text';

interface GameChannelProps {
    data: SteamAppDetailResponse;
    count?: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 900px;
    width: 100%;
    height: 100px;
    margin-top: 8px;
    background-color: #263245;
    &:hover {
        background-color: #425779;
    }
`;

const ChannelIndicator = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #23de79;
`;
const PopularChannel = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 20px;
    gap: 8px;
`;

const GameImageArea = styled.div`
    width: 212px;
    height: 100%;
    position: relative;
`;

const GameImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const GameDetailSection = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100%;
    padding: 20px 24px 24px 24px;
`;

const GameDetail = styled.div`
    display: flex;
    width: calc(100% - 100px);
    /* width: 400px; */
    padding-right: 12px;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
`;

const GameInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden; /* overflow 속성 추가 */
`;

const EnterButton = styled.button`
    width: 100px;
    height: 42px;
    background: #00b8c8;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.03em;
    color: #ffffff;
`;

function GameChannel({ data, count }: GameChannelProps) {
    return (
        <Container>
            <GameImageArea>
                <GameImage src={data.header_image} alt={`${data.name} thumbnail`} />
            </GameImageArea>
            <GameDetailSection>
                <GameDetail>
                    <Text text={data.name} size={24} />
                    <GameInfo>
                        <Text
                            text={data?.genres?.map((e) => e.description).join(', ') || ''}
                            size={16}
                            color="#a7a9ac"
                        />
                        {count && (
                            <PopularChannel>
                                <ChannelIndicator />
                                <Text text={`${count}명`} />
                            </PopularChannel>
                        )}
                    </GameInfo>
                </GameDetail>
                <EnterButton onClick={() => {}}>입장하기</EnterButton>
            </GameDetailSection>
        </Container>
    );
}

export default GameChannel;
