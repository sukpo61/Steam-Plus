import { UserAvatar } from '@/components/common/UserAvatar';
import { useRouter } from 'next/navigation';

export interface ChannelTileProps {}

export const ServerTile = ({ data }: any) => {
    const { push } = useRouter();
    const { id, name, memberCount, user } = data;
    const { avatar } = user;

    const onClickHandler = () => {
        push(`/server/${id}`);
    };

    return (
        <div
            className="flex h-16 w-full cursor-pointer items-center gap-4 bg-primary-foreground/10 p-4 backdrop-blur-lg hover:bg-primary-foreground/20"
            onClick={onClickHandler}
        >
            <div className="flex items-center justify-center">
                <UserAvatar src={avatar} className="h-10 w-10" />
            </div>
            <div className="flex flex-1 items-center">
                <span>{name}</span>
            </div>
            <div className="flex items-center">
                <span>{`${memberCount}`}</span>
            </div>
        </div>
    );
};
