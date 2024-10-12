import { create } from 'zustand';

interface ServerData {
    serverId?: number;
    name?: string;
}

interface ServerStore {
    data: any;
    setServerData: (data?: ServerData) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
    data: {},
    setServerData: (data = {}) => set({ data }),
}));
