import { atom } from 'recoil';
import { ToastOption } from 'types/toast';

interface Toast {
    id: number;
    message: string;
    option: ToastOption;
}

export const isReplyInputRecoil = atom<string | null>({
    key: `isreplyinput`,
    default: null,
});

export const isCommentDropDownRecoil = atom<string | null>({
    key: `iscommentdropdown`,
    default: null,
});
