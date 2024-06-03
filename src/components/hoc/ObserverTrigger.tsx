import Observer from "@components/common/Observer";
import { FC, PropsWithChildren } from "react";

interface ObserverTriggerProps {
  onObserve: VoidFunction;
  observerMinHeight: string;
}

export const ObserverTrigger: FC<PropsWithChildren<ObserverTriggerProps>> = ({
  children,
  onObserve,
  observerMinHeight,
}) => {
  return (
    <>
      {children}
      <Observer onObserve={onObserve} minHeight={observerMinHeight} />
    </>
  );
};
