import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled from "@emotion/styled";

interface ObserverProps {
  rootMargin?: string;
  threshold?: number;
  minHeight: string;
  onObserve: VoidFunction;
}

const ObserverContainer = styled.div<{ minHeight: string }>`
  width: 100%;
  height: max-content;
  min-height: ${({ minHeight }) => minHeight};
`;

const Observer: FC<PropsWithChildren<ObserverProps>> = ({
  rootMargin = "0px",
  threshold = 0.3,
  minHeight,
  onObserve,
  children,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) onObserve();
    },
    [onObserve]
  );

  useEffect(() => {
    const options = { root: null, rootMargin, threshold };
    const observer = new IntersectionObserver(handleObserver, options);

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [handleObserver, rootMargin, threshold]);

  return (
    <ObserverContainer minHeight={minHeight} ref={observerRef}>
      {children}
    </ObserverContainer>
  );
};

export default Observer;
