export type PropsWithCustomStyle<
  P = {},
  K extends "w" | "h" | "m" | "p" = "w" | "h" | "m" | "p"
> = P & {
  [k in Extract<K, string>]?: string;
};
