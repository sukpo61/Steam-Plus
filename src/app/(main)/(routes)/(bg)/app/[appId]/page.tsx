import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { NextPage } from 'next';
import { AppParams } from 'types/params/app';
import { AppServer } from '../_components/AppServer';

interface AppPageProps {
    params: AppParams;
}

const AppPage: NextPage<AppPageProps> = ({ params }) => {
    return (
        <QuerySuspenseErrorBoundary>
            <AppServer params={params} />;
        </QuerySuspenseErrorBoundary>
    );
};

export default AppPage;
