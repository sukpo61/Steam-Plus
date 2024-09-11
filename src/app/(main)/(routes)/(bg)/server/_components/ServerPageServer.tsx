import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ServerParams } from 'types/params/server';
import { ServerClient } from './ServerClient';

interface ServerPageServerProps {
    params: ServerParams;
}

export const ServerPageServer = ({ params }: ServerPageServerProps) => {
    const queryClient = new QueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ServerClient params={params} />
        </HydrationBoundary>
    );
};
