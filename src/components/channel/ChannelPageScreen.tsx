'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { ChannelParams } from 'types/params/channel';
import Channel from './Channel';

interface ChannelPageScreenProps {
    params: ChannelParams;
}

const ChannelPageScreen = ({ params }: ChannelPageScreenProps) => {
    return (
        <QuerySuspenseErrorBoundary>
            <Channel params={params} />
        </QuerySuspenseErrorBoundary>
    );
};

export default ChannelPageScreen;
