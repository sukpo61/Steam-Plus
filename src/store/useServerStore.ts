import { create } from 'zustand';

interface ServerData {
    serverId?: number;
    name?: string;
    channels?: {
        id: string;
        name: string;
        type: 'TEXT' | 'AUDIO' | 'VIDEO';
    };
}

interface ServerStore {
    data: any;
    setServerData: (data?: ServerData) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
    data: {},
    setServerData: (data = {}) => set({ data }),
}));
