/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react';

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
}) => {
  useLayoutEffect(() => {
    let observer: any;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current ?? target);
    }

    return () => observer && observer.disconnect();
  }, [target, root, rootMargin, threshold]);
};
