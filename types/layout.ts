import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface BottomIconProps {
  selected?: boolean;
}

export type { BottomIconProps, NextPageWithLayout };
