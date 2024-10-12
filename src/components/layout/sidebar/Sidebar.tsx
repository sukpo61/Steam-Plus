import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { SidebarServer } from './SidebarServer';
import { headers } from 'next/headers';

export const Sidebar = async ({ params }: any) => {
    // await queryClient.prefetchQuery({
    //     queryKey: [API_GET_USER_INFO_KEY],
    //     queryFn: getUserInfo,
    // });
    const headersList = headers();
    // read the custom x-url header
    const header_url = headersList.get('x-url') || '';

    return (
        <QuerySuspenseErrorBoundary suspenseFallback={<div />}>
            <SidebarServer />
        </QuerySuspenseErrorBoundary>
    );
};
