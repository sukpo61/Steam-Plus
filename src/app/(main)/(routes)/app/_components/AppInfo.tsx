'use client';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { BgLayout } from '@/components/layout/main/BgLayout';
import { Button } from '@/components/ui/Button';
import { Carousel } from '@/components/carousel/EmblaCarousel';
import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { GameData } from 'types/steam/SteamAppDetailResponse';
import Image from 'next/image';
import { useModalStore } from '@/store/useModalStore';
import { useRouter } from 'next/navigation';

interface ChannelInfoProps {
    data: GameData;
}

export const AppInfo = ({ data }: ChannelInfoProps) => {
    const { header_image, steam_appid: appId, name, screenshots, short_description } = data;
    const { push } = useRouter();
    const { onOpen } = useModalStore((state) => state);

    return (
        <div className="flex aspect-[16/5] w-full items-center justify-center gap-4 overflow-hidden">
            <div className="flex h-full flex-1 overflow-hidden rounded-2xl">
                <BgLayout>
                    <div className="flex h-full w-full flex-col gap-2 p-4">
                        <span className="ellipsis text-2xl">{name}</span>
                        <div className="relative flex aspect-[460/215] w-full flex-col items-start gap-2">
                            <Image key={appId} src={header_image} alt="Postimage" fill />
                        </div>
                        <span className="pre-line flex-1 basis-0 overflow-hidden text-sm">
                            {short_description}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size={'iconlg'}
                                onClick={() => push(`/community/${appId}`)}
                                className="bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20"
                            >
                                <CommunityIcon />
                            </Button>
                            <Button
                                size={'iconlg'}
                                onClick={() => onOpen('createServer', { appId, header_image })}
                                className="bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20"
                            >
                                <AddIcon />
                            </Button>
                        </div>
                    </div>
                </BgLayout>
            </div>
            <section className="aspect-[32/13] h-full overflow-hidden rounded-2xl bg-primary">
                <Carousel slides={screenshots} />
            </section>
        </div>
    );
};
