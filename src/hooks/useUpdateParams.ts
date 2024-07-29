import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (paramsObject: Record<string, string>) => {
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

    const updateParams = (data: any) => {
        router.replace(`${pathname}?${createQueryString(data)}`, { scroll: true });
    };

    return {
        updateParams,
    };
};
