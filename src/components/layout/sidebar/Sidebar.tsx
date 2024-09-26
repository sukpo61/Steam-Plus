import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { headers } from 'next/headers';
import { SidebarServer } from './SidebarServer';

export const Sidebar = async ({ params }: any) => {
    // await queryClient.prefetchQuery({
    //     queryKey: [API_GET_USER_INFO_KEY],
    //     queryFn: getUserInfo,
    // });
    const headersList = headers();
    // read the custom x-url header
    const header_url = headersList.get('x-url') || '';

    console.log('header_url', header_url);

    return (
        <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
            <SidebarServer />
        </QuerySuspenseErrorBoundary>
    );
};
