import ChannelPageScreen from '@/components/channel/ChannelPageScreen';
import { ChannelParams } from 'types/params/channel';
import { NextPage } from 'next';

interface ChannelPageProps {
    params: ChannelParams;
}

const ChannelPage: NextPage<ChannelPageProps> = async (props) => {
    const params = await props.params;
    return <ChannelPageScreen params={params} />;
};

export default ChannelPage;
