'use client';

import DefaultError from '@/components/common/DefaultError';
import DefaultLoading from '@/components/loading/DefaultLoading';
import { Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactEventHandler } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface QuerySuspenseErrorBoundaryProps {
    children: React.ReactNode;
    suspenseFallback?: React.ReactNode | string;
    errorFallback?: (resetErrorBoundary: ReactEventHandler<HTMLButtonElement>) => React.ReactNode;
}

export const QuerySuspenseErrorBoundary: FC<PropsWithChildren<QuerySuspenseErrorBoundaryProps>> = ({
    children,
    suspenseFallback,
    errorFallback,
}) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    onError={(error) => {
                        console.error(error.message);
                    }}
                    fallbackRender={({ resetErrorBoundary }) =>
                        errorFallback ? (
                            errorFallback(resetErrorBoundary)
                        ) : (
                            <DefaultError onClick={resetErrorBoundary} />
                        )
                    }
                >
                    <Suspense.CSROnly fallback={suspenseFallback ?? <DefaultLoading />}>
                        {children}
                    </Suspense.CSROnly>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};
