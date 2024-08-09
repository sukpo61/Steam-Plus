import { Observer } from '@/components/common/Observer';
import { ReactNode } from 'react';

interface ObserverTriggerProps {
    children: ReactNode;
    onObserve: VoidFunction;
    observerMinHeight?: string;
}

export const ObserverTrigger = ({
    children,
    onObserve,
    observerMinHeight = '30px',
}: ObserverTriggerProps) => {
    return (
        <>
            {children}
            <Observer onObserve={onObserve} minHeight={observerMinHeight} />
        </>
    );
};
