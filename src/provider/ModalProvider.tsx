'use client';

import { CreateChannelModal } from '@/components/modals/CreateChannelModal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateChannelModal />
        </>
    );
};
