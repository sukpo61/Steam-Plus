import { create } from 'zustand';

interface BgState {
    appId?: string | number;
    background?: string;
    setBackground: (payload: { appId: string | number; background: string }) => void;
}

export const useBgStore = create<BgState>((set) => ({
    appId: undefined,
    background: '',
    setBackground: ({ appId, background }) => {
        set((state) => {
            const { appId: prevId } = state;
            if (appId === prevId) return state;
            return {
                appId,
                background,
            };
        });
    },
}));
