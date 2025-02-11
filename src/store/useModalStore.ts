import { create } from 'zustand';

export type ModalType =
    | 'createServer'
    | 'invite'
    | 'editServer'
    | 'members'
    | 'createChannel'
    | 'leaveServer'
    | 'deleteServer'
    | 'deleteChannel'
    | 'editChannel'
    | 'messageFile'
    | 'deleteMessage'
    | 'joinServer'
    | 'leaveServer'
    | 'kickMember';

interface ModalData {
    appId?: number;
    header_image?: string;

    serverId?: string;
    channelId?: string;
    memberId?: string;
    defaultChannelId?: string;
    name?: string;
    description?: string;
    onConfirm?: () => void;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => {
        return set({ isOpen: true, type: type, data });
    },
    onClose: () => set({ type: null, isOpen: false }),
}));
