'use client';

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                throwOnError: true,
                staleTime: 60 * 3 * 1000,
                // refetchOnMount: false,
                // refetchOnWindowFocus: false,
            },
        },
    });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
};

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools buttonPosition="bottom-right" />
        </QueryClientProvider>
    );
};
