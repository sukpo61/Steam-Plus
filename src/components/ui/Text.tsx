import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Typo } from 'styles/Typography';
import { css } from '@emotion/react';

const TextContainer = styled.span<TextProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--main-text-color);
    ${({ typo }) => typo || Typo.Body.Body1Regular}
    ${({ preLine }) =>
        preLine &&
        css`
            white-space: pre-line;
            word-break: break-all;
        `}
    ${({ ellipsis }) =>
        ellipsis &&
        css`
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
    ${({ underLine }) =>
        underLine &&
        css`
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        `}
`;

export interface TextProps {
    text?: string | number;
    typo?: SerializedStyles;
    margin?: string;
    align?: 'left' | 'center' | 'right';
    ellipsis?: boolean;
    preLine?: boolean;
    underLine?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Text = ({ text, ellipsis = true, preLine = false, onClick, ...props }: TextProps) => {
    return (
        <>
            {text ? (
                <TextContainer {...props} onClick={onClick}>
                    {text || ''}
                </TextContainer>
            ) : null}
        </>
    );
};
