import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCallback } from 'react';

interface Params {
    defaultParams?: Record<any, any>;
}

export const useUpdateParams = (params?: Params) => {
    const { defaultParams } = params || {};
    const { replace, push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (paramsObject: Record<string, string | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(paramsObject).forEach(([name, value]) => {
                const isDefaultValue = defaultParams && defaultParams[name] === value;
                if (value === null || value === undefined || value === '' || isDefaultValue) {
                    params.delete(name);
                } else {
                    params.set(name, value);
                }
            });
            return params.toString();
        },
        [searchParams, defaultParams],
    );

    const updateParams = (data: Record<any, any>, option?: string) => {
        const result = `${pathname}?${createQueryString(data)}`;
        console.log('result', result);

        if (option === 'push') {
            push(result, { scroll: true });
            return;
        }
        replace(result, { scroll: true });
    };

    return {
        updateParams,
    };
};
