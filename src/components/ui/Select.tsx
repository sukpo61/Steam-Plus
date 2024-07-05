import styled from '@emotion/styled';
import { ChangeEvent, SelectHTMLAttributes, forwardRef } from 'react';
import { ColorToken } from 'styles/Color';

interface SelectStyleProps {
    isBorderRadius?: boolean;
    errorMessage?: string;
}

const Container = styled.div<{ width?: string | number | undefined }>`
    display: flex;
    position: relative;
    max-width: ${({ width }) => `${width}px`};
    width: 100%;
    height: 40px;
`;

const CusttomSelect = styled.select<SelectStyleProps>`
    width: 172px;
    height: 40px;
    border-radius: 10px;
    background: #263245;
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
    color: #fff;
    border: 0;
    text-indent: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.03em;
    outline: 0px none transparent;
`;

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

interface CusttomSelectProps extends SelectProps {
    width?: number;
    whiteSpace?: boolean;
    data: { id: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, CusttomSelectProps>(
    ({ onSubmit, width, data, ...props }, ref) => {
        return (
            <Container width={width}>
                <CusttomSelect {...props} ref={ref}>
                    {data.map(({ label, id }: any) => (
                        <option key={id} value={id}>
                            {label}
                        </option>
                    ))}
                </CusttomSelect>
            </Container>
        );
    },
);

Select.displayName = 'Select';

export default Select;
