'use client';

import { useEffect, useState } from 'react';

import { CreateChannelModal } from '@/components/modals/createChannel/CreateChannelModal';
import { CreateServerModal } from '@/components/modals/createServer/CreateServerModal';
import { DeleteChannelModal } from '@/components/modals/deleteChannel/deleteChannelModal';
import { DeleteServerModal } from '@/components/modals/deleteServer/DeleteServerModal';
import { EditChannelModal } from '@/components/modals/editChannel/EditChannelModal';
import { EditServerModal } from '@/components/modals/editServer/EditServerModal';
import { JoinServerModal } from '@/components/modals/joinServer/JoinServerModal';
import { LeaveServerModal } from '@/components/modals/leaveServer/LeaveServerModal';

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
            <CreateServerModal />
            <JoinServerModal />
            <DeleteServerModal />
            <LeaveServerModal />
            <EditServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
        </>
    );
};
