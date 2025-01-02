'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { ToggleButtonGroup } from './ToggleButtonGroup';

export const FRIENDS_TYPE_LABEL = [
    {
        id: 'all',
        label: '모두',
        varient: 'default',
    },
    {
        id: 'pending',
        label: '대기중',
        varient: 'default',
    },
    {
        id: 'add',
        label: '친구추가',
        varient: 'publish',
    },
];

export const FriendToggleButton = () => {
    const { setValue, control } = useFormContext<any>();

    const type = useWatch({ control, name: 'type' });

    return (
        <ToggleButtonGroup
            data={FRIENDS_TYPE_LABEL}
            onChange={(value) => setValue('type', value)}
            activeId={type}
        />
    );
};
