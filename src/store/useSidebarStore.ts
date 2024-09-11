import { create } from 'zustand';

export type SidebarType = 'friend' | 'server';

interface SidebarData {
    serverId?: number;
}

interface SidebarStore {
    type: SidebarType | null;
    data: SidebarData;
    setType: (type: SidebarType, data?: SidebarData) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    type: 'friend',
    data: {},
    setType: (type, data = {}) => set({ type, data }),
}));
