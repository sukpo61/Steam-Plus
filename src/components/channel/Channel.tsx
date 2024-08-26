'use client';

import { API_CHANNEL_KEY, getChannel } from '@/actions/channel/channel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChannelParams } from 'types/params/channel';
import { ChannelInfo } from './ChannelInfo';
import { RoomTile } from './RoomTile';

interface ChannelProps {
    params: ChannelParams;
}

const Channel = ({ params }: ChannelProps) => {
    const { data } = useSuspenseQuery({
        queryKey: [API_CHANNEL_KEY, params],
        queryFn: () => getChannel({ params }),
    });

    const { rooms, channelDetail } = data;

    const { background, steam_appid } = channelDetail;

    const mockdata = Array(30).fill('');

    

    return (
        <div
            className="flex h-full w-full flex-col items-center overflow-y-scroll bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex w-full max-w-[948px] flex-col items-center gap-1 p-10">
                <ChannelInfo data={channelDetail} />
                {mockdata.map(() => (
                    <RoomTile data={channelDetail} />
                ))}
            </div>
        </div>
    );
};

export default Channel;
