'use client';

import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GameData } from 'types/steam/SteamAppDetailResponse';
import { PhotoGallery } from './PhotoGallery';

interface ChannelInfoProps {
    data: GameData;
}

export const AppInfo = ({ data }: ChannelInfoProps) => {
    const { header_image, steam_appid, name, screenshots } = data;
    const { push } = useRouter();
    return (
        <div className="relative flex w-full flex-col gap-4">
            <header className="flex w-full justify-between">
                <span className="text-3xl">{name}</span>
                <Button onClick={() => push(`/community/${steam_appid}`)}>커뮤니티</Button>
            </header>
            <div className="flex w-full gap-2">
                <div className="relative w-[240px]">
                    <Image
                        key={steam_appid}
                        src={header_image}
                        alt="Postimage"
                        width={240}
                        height={0}
                    />
                </div>
                <div className="flex min-w-0 flex-1">
                    <PhotoGallery imageData={screenshots} />
                </div>
            </div>
        </div>
    );
};
