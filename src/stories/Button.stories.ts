import { Button } from '@/components/ui/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'trans', 'outline', 'secondary', 'primary'],
        },
        size: {
            control: 'radio',
            options: ['default', 'sm', 'lg', 'icon', 'iconround', 'iconl'],
        },
        disabled: {
            control: 'boolean',
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Default Button',
    },
};

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Button',
    },
};

export const IconButton: Story = {
    args: {
        variant: 'default',
        size: 'iconround',
        children: '🔍',
    },
};
