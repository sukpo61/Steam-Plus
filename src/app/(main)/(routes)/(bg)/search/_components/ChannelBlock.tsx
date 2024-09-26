import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SearchParams } from 'types/params/search';
import { GameData } from 'types/steam/SteamAppDetailResponse';

interface ChannelBlockProps {
    searchParams: SearchParams;
    data: GameData;
    count?: number;
}

export const AppBlock = ({ searchParams, data, count }: ChannelBlockProps) => {
    const { purpose } = searchParams;
    const { name, header_image, steam_appid } = data;

    const { push } = useRouter();

    const onClickHandler = () => {
        if (purpose === 'addpost') {
            push(`/community/${steam_appid}/add`);
            return;
        }
        push(`/app/${steam_appid}`);
    };

    return (
        <div
            className="flex h-16 w-full cursor-pointer bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20"
            onClick={onClickHandler}
        >
            <div className="relative h-full w-[138px]">
                <Image
                    src={header_image}
                    alt={`${name} thumbnail`}
                    fill
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex h-full flex-1 flex-row items-center justify-between overflow-hidden p-4">
                <span className="ellipsis">{name}</span>
                {count && <span>{count}</span>}
            </div>
        </div>
    );
};
