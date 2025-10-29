import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as React from 'react';

import { cn } from '@/lib/utils';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuPortal = ({ ...props }: ContextMenuPrimitive.ContextMenuPortalProps) => (
    <ContextMenuPrimitive.Portal {...props} />
);
ContextMenuPortal.displayName = ContextMenuPrimitive.Portal.displayName;

const ContextMenuContent = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) => (
    <ContextMenuPortal>
        <ContextMenuPrimitive.Content
            className={cn('z-50 min-w-40 rounded-md bg-primary-darker p-1 shadow-md', className)}
            {...props}
        >
            {children}
        </ContextMenuPrimitive.Content>
    </ContextMenuPortal>
);
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = ({
    className,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item>) => (
    <ContextMenuPrimitive.Item
        className={cn(
            'cursor-pointer rounded p-1 text-sm hover:bg-primary-bright focus:border-none',
            className,
        )}
        {...props}
    />
);
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = ({
    className,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => (
    <ContextMenuPrimitive.CheckboxItem
        className={cn('hover:bg-accent cursor-pointer rounded p-2', className)}
        {...props}
    />
);
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = ({
    className,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => (
    <ContextMenuPrimitive.RadioItem
        className={cn('hover:bg-accent cursor-pointer rounded p-2', className)}
        {...props}
    />
);
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = ({
    className,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label>) => (
    <ContextMenuPrimitive.Label
        className={cn('text-muted-foreground text-xs font-semibold', className)}
        {...props}
    />
);
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = ({
    className,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) => (
    <ContextMenuPrimitive.Separator
        className={cn('my-1 h-px bg-primary-bright', className)}
        {...props}
    />
);
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuSubTrigger = ContextMenuPrimitive.SubTrigger;
const ContextMenuSubContent = ContextMenuPrimitive.SubContent;

const ContextMenuItemIndicator = ContextMenuPrimitive.ItemIndicator;

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuPortal,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuGroup,
    ContextMenuRadioGroup,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuItemIndicator,
};
