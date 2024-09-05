import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateParams = () => {
    const { replace, push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (paramsObject: Record<string, string | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(paramsObject).forEach(([name, value]) => {
                if (value === null || value === undefined || value === '') {
                    params.delete(name);
                } else {
                    params.set(name, value);
                }
            });
            return params.toString();
        },
        [searchParams],
    );

    const updateParams = (data: Record<any, any>, option?: string) => {
        if (option === 'push') {
            push(`${pathname}?${createQueryString(data)}`, { scroll: true });
            return;
        }
        replace(`${pathname}?${createQueryString(data)}`, { scroll: true });
    };

    return {
        updateParams,
    };
};
