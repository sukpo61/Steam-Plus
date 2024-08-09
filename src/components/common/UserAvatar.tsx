import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { cn } from 'src/lib/utils';

interface UserAvatarProps {
    src?: string;
    className?: string;
}

export const UserAvatar = ({ src = '/images/profile/profile.png', className }: UserAvatarProps) => {
    return (
        <Avatar className={cn('min-w-10 min-h-10 rounded-full overflow-hidden', className)}>
            <AvatarImage src={src} />
        </Avatar>
    );
};
