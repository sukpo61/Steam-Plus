import { create } from 'zustand';

interface UserData {
    serverId?: number;
}

interface UserStore {
    data: any;
    setUserData: (data?: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    data: {},
    setUserData: (data = {}) => set({ data }),
}));
