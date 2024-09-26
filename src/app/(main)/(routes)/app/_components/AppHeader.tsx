'use client';

import { AddIcon } from '@/components/icons/common/Add.icon';
import { BgLayout } from '@/components/layout/main/bgLayout';
import { Button } from '@/components/ui/Button';
import { CommunityIcon } from '@/components/icons/common/Community.icon';
import { GameData } from 'types/steam/SteamAppDetailResponse';
import Image from 'next/image';
import { useModalStore } from '@/store/useModalStore';
import { useRouter } from 'next/navigation';

interface ChannelInfoProps {
    data: GameData;
}

export const AppHeader = ({ data }: ChannelInfoProps) => {
    const { header_image, steam_appid: appId, name } = data;
    const { push } = useRouter();
    const { onOpen } = useModalStore();

    return (
        <div className="flex w-full overflow-hidden rounded-xl">
            <BgLayout>
                <div className="flex h-full w-full items-center justify-between gap-2 p-2">
                    <div className="flex items-center gap-2">
                        <div className="relative flex aspect-[460/215] w-[115px] flex-col items-start gap-2">
                            <Image key={appId} src={header_image} alt="Postimage" fill />
                        </div>
                        <span className="ellipsis text-2xl">{name}</span>
                    </div>
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
                            onClick={() => onOpen('createChannel', { appId, header_image })}
                            className="bg-primary-foreground/10 backdrop-blur-lg hover:bg-primary-foreground/20"
                        >
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            </BgLayout>
        </div>
    );
};
