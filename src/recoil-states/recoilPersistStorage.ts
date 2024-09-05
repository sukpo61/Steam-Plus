import { recoilPersist } from "recoil-persist";

type RecoilStorageProps = {
  key: string;
  storage: string;
};

export const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;
export const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

export const recoilStorage = ({ key, storage }: RecoilStorageProps) => {
  const { persistAtom } = recoilPersist({
    key: key,
    storage: storage === "session" ? sessionStorage : localStorage,
  });

  return persistAtom;
};
