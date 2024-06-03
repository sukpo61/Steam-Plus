import { atom } from "recoil";
import { ToastOption } from "types/toast";

interface Toast {
  id: number;
  message: string;
  option: ToastOption;
}

export const toastRecoil = atom<Toast[]>({
  key: `toast`,
  default: [],
});
