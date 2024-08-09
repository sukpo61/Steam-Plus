import { ChangeEvent, SelectHTMLAttributes, forwardRef } from 'react';

interface SelectStyleProps {
    isBorderRadius?: boolean;
    errorMessage?: string;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

interface CustomSelectProps extends SelectProps {
    width?: number;
    whiteSpace?: boolean;
    data: { id: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, CustomSelectProps>(
    ({ data, ...props }, ref) => {
        return (
            <div className="relative flex h-10 w-full">
                <select
                    {...props}
                    ref={ref}
                    className="flex h-10 w-40 items-center rounded-lg border-0 bg-primary-bright px-2 text-sm outline-none"
                >
                    {data.map(({ label, id }) => (
                        <option key={id} value={id}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        );
    },
);

Select.displayName = 'Select';
