import ChannelPageScreen from '@/components/channel/ChannelPageScreen';
import { NextPage } from 'next';
import { ChannelParams } from 'types/params/channel';

interface ChannelPageProps {
    params: ChannelParams;
}

const ChannelPage: NextPage<ChannelPageProps> = ({ params }) => {
    return <ChannelPageScreen params={params} />;
};

export default ChannelPage;
