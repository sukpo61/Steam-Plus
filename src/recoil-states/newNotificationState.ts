import { atom } from "recoil";
import { NotificationResponse } from "types/notification/NotificationResponse";
import { selector } from "recoil";

export const newNotificationRecoil = atom<NotificationResponse[]>({
  key: `newnotification`,
  default: [],
});

export const newNotificationCountRecoil = selector({
  key: "newnotificationcount",
  get: ({ get }) => {
    const newnotification = get(newNotificationRecoil);
    const count = newnotification.length;
    return count;
  },
});
