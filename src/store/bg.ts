import { create } from 'zustand';

export const useBgStore = create((set) => ({
    id: undefined,
    bg: undefined,
    setBg: ({ id, bg }: { id: string; bg: string }) => {
        set((state: { id: string; bg: string }) => {
            const { id: prevId } = state;
            if (id === prevId) return;
            return {
                id: id,
                bg: bg,
            };
        });
    },
}));
