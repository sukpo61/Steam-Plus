import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "./recoilPersistStorage";

const { persistAtom } = recoilPersist({
  key: "recentKeywords",
  storage: sessionStorage,
});
export const recentKeywordStates = atom<string[]>({
  key: `recentKeyword`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
