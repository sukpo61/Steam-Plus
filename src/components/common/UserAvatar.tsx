import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

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
interface UserAvatarProps {
    src?: string;
    className?: string;
    size?: any;
}

export const UserAvatar = ({
    src = '/images/profile/profile.png',
    className,
    size,
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(avatarVariants({ size, className }))}>
            <AvatarImage src={src} />
        </Avatar>
    );
};
