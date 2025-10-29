import { create } from 'zustand';

interface PreviewState {
    isPreview: boolean;
    setIsPreview: (payload: boolean, data?: any) => void;
    data?: any;
}

export const usePreviewStore = create<PreviewState>((set) => ({
    isPreview: false,
    data: {},
    setIsPreview: (payload: boolean, data = {}) => {
        set({ isPreview: payload, data });
    },
}));
