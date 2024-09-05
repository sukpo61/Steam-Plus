import styled from '@emotion/styled';
import { CSSProperties, MouseEventHandler, useMemo } from 'react';
import { ColorToken } from 'styles/Color';

const TextContainer = styled.div``;

export interface TextProps {
    text: string;
    margin?: string;
    fontFamily?: string;
    size?: number; // default = 10
    weight?: number; // default = 400
    align?: 'left' | 'center' | 'right'; // default = left
    color?: string; // default = 'black'
    style?: CSSProperties;
    ellipsis?: boolean; // default = true
    preLine?: boolean;
    lineHeight?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DefaultText = ({
    size = 10,
    text,
    fontFamily = 'Google Sans',
    weight = 400,
    lineHeight = '1.1',
    color = ColorToken.text_primary,
    align,
    style,
    ellipsis = true,
    preLine = false,
    onClick,
    margin = '0',
    ...props
}: TextProps) => {
    /*
  아래는 추가 랜더링 방지용 메모 설정. 
  */
    const fontSize = useMemo(() => {
        return size;
    }, [size]);

    const fontWeight = useMemo(() => {
        return weight;
    }, [weight]);

    const textAlign = useMemo(() => {
        if (align) return align;
        else return 'left';
    }, [align]);

    const textColor = useMemo(() => {
        return color;
    }, [color]);

    const firstLineStyles = useMemo(() => {
        if (preLine) {
            return {
                whiteSpace: 'pre-line' as const,
                wordBreak: 'break-all' as const,
                '&::firstLine': {
                    fontWeight: 'bold' as const,
                },
            };
        }
        return {};
    }, [preLine]);
    return (
        <TextContainer
            {...props}
            style={{
                margin,
                fontSize,
                lineHeight,
                fontWeight,
                fontFamily,
                textAlign,
                letterSpacing: '-0.2px',
                color: textColor,
                ...style,
                ...(ellipsis !== false && {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }),
                ...firstLineStyles,
            }}
            onClick={onClick}
        >
            {text || ''}
        </TextContainer>
    );
};
