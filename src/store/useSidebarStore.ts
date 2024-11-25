import { create } from 'zustand';

export type SidebarType = 'friend' | 'server' | 'library';

interface SidebarData {
    id?: string;
    name?: string;
    appId?: number;
    channelId?: string;
    channels?: {
        id: string;
        name: string;
        type: 'TEXT' | 'AUDIO' | 'VIDEO';
    }[];
    role?: string;
    memberId?: string;
    description?: string;
}

interface SidebarStore {
    type: SidebarType | null;
    data: SidebarData;
    setType: (type: SidebarType, data?: SidebarData) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    type: 'friend',
    data: { name: '기본이름' },
    setType: (type, data = {}) => set({ type, data }),
}));
