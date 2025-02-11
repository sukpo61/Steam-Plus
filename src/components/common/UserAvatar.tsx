import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuTrigger,
} from '@/components/ui/ContextMenu';

import { cn } from 'src/lib/utils';
import { cva } from 'class-variance-authority';

interface UserAvatarProps {
    src?: string;
    className?: string;
    size?: any;
    isFriend?: boolean;
    isContext?: boolean;
}

const avatarVariants = cva('rounded-full overflow-hidden', {
    variants: {
        size: {
            default: 'w-8 h-8',
            sm: 'h-9 rounded-md px-3',
            lg: 'w-8 h-8',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

export const UserAvatar = ({
    src = '/images/profile/profile.png',
    className,
    size,
    isFriend,
    isContext = false,
}: UserAvatarProps) => {
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <Avatar className={cn(avatarVariants({ size, className }))}>
                        <AvatarImage src={src} />
                    </Avatar>
                </ContextMenuTrigger>
                <ContextMenuPortal>
                    {isContext && (
                        <ContextMenuContent>
                            {!isFriend && (
                                <ContextMenuItem>
                                    <span className="">친구추가</span>
                                </ContextMenuItem>
                            )}
                            <ContextMenuItem>
                                <span className="">프로필 보기</span>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    )}
                </ContextMenuPortal>
            </ContextMenu>
        </>
    );
};
