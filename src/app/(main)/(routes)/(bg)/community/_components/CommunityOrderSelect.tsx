'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';
import { useFormContext, useWatch } from 'react-hook-form';

import { CommunityFormValue } from './CommunityController';

export const COMMUNIY_ORDER_LABEL = [
    {
        id: 'popular',
        label: '인기순',
    },
    {
        id: 'desc',
        label: '최신순',
    },
];

export const CommunityOrderSelect = () => {
    const { setValue, control } = useFormContext<CommunityFormValue>();

    const order = useWatch({ control, name: 'order' });

    const onValueChange = (value: string) => {
        setValue('order', value);
        setValue('page', '1');
    };

    return (
        <Select defaultValue={order} onValueChange={onValueChange}>
            <SelectTrigger className="border-0 bg-primary-bright outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
                {COMMUNIY_ORDER_LABEL.map(({ id, label }) => (
                    <SelectItem key={id} value={id} className="capitalize">
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
