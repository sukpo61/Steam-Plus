'use client';

import { CommunityFormValue } from '@/app/(main)/(routes)/community/_components/CommunityPageController';
import { ToggleButtonGroup } from '@/components/ui/ToggleButtonGroup';
import { useFormContext, useWatch } from 'react-hook-form';

export const COMMUNIY_CATEGORY_LABEL = [
    {
        id: 'all',
        label: '전체',
    },
    {
        id: 'free',
        label: '자유',
    },
    {
        id: 'recruit',
        label: '모집',
    },
];

export const CommunityCateButton = () => {
    const { setValue, control } = useFormContext<CommunityFormValue>();

    const category = useWatch({ control, name: 'category' });

    return (
        <ToggleButtonGroup
            data={COMMUNIY_CATEGORY_LABEL}
            onChange={(value) => setValue('category', value)}
            activeId={category}
        />
    );
};
