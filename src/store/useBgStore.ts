import create from 'zustand';

interface BgState {
    appId?: string | number;
    background?: string;
    setBackground: (payload: { appId: string | number; background: string }) => void;
}

export const useBgStore = create<BgState>((set) => ({
    appId: undefined,
    background:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1621690/page_bg_generated_v6b.jpg?t=1725299065',
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
