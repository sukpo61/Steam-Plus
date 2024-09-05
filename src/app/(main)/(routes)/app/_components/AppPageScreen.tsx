'use client';

import { QuerySuspenseErrorBoundary } from '@/components/hoc/QuerySuspenseErrorBoundary';
import { BgLayout } from '@/components/layout/main/bgLayout';
import { AppParams } from 'types/params/app';
import { App } from './App';

interface AppPageScreenProps {
    params: AppParams;
}

const AppPageScreen = ({ params }: AppPageScreenProps) => {
    return (
        <BgLayout>
            <QuerySuspenseErrorBoundary>
                <App params={params} />
            </QuerySuspenseErrorBoundary>
        </BgLayout>
    );
};

export default AppPageScreen;
