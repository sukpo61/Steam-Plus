import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';

interface ObserverProps {
    rootMargin?: string;
    threshold?: number;
    minHeight: string;
    onObserve: VoidFunction;
}

export const Observer: FC<PropsWithChildren<ObserverProps>> = ({
    rootMargin = '0px',
    threshold = 0.3,
    minHeight,
    onObserve,
    children,
}) => {
    const observerRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting) onObserve();
        },
        [onObserve],
    );

    useEffect(() => {
        const options = { root: null, rootMargin, threshold };
        const observer = new IntersectionObserver(handleObserver, options);

        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => observer.disconnect();
    }, [handleObserver, rootMargin, threshold]);

    return (
        <div className={`h-max w-full min-h-[${minHeight}] `} ref={observerRef}>
            {children}
        </div>
    );
};
