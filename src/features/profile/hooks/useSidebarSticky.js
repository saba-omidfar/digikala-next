"use client";

import { useEffect, useRef } from "react";

const STATUS = {
  ORIGINAL: 0,
  RELEASED: 1,
  FIXED: 2,
};

export default function useSidebarSticky({
  top = 86,
  bottomBoundarySelector = "#products-container",
  enabled = true,
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const state = useRef({
    status: STATUS.ORIGINAL,
    topBoundary: 0,
    bottomBoundary: Infinity,
    height: 0,
    width: 0,
    pos: 0,
    scrollTop: 0,
    lastDelta: 0,
  });

  const raf = useRef(null);

  const getScrollTop = () =>
    window.scrollY || document.documentElement.scrollTop;

  const getBottomBoundary = () => {
    const el = document.querySelector(bottomBoundarySelector);
    if (!el) return Infinity;
    const rect = el.getBoundingClientRect();
    return getScrollTop() + rect.bottom;
  };

  const measure = () => {
    if (!outerRef.current || !innerRef.current) return;

    const outer = outerRef.current.getBoundingClientRect();
    const inner = innerRef.current.getBoundingClientRect();

    const scrollTop = getScrollTop();

    state.current.topBoundary = outer.top + scrollTop;
    state.current.bottomBoundary = getBottomBoundary();
    state.current.height = inner.height;
    state.current.width = outer.width;
    state.current.scrollTop = scrollTop;
  };

  const reset = () => {
    state.current.status = STATUS.ORIGINAL;
    state.current.pos = 0;
  };

  const release = (pos) => {
    state.current.status = STATUS.RELEASED;
    state.current.pos = pos;
  };

  const fix = (pos) => {
    state.current.status = STATUS.FIXED;
    state.current.pos = pos;
  };

  const update = () => {
    if (!enabled) return;

    const s = state.current;

    const scrollTop = getScrollTop();
    const topEdge = scrollTop + top;
    const bottomEdge = scrollTop + top + s.height;

    if (topEdge <= s.topBoundary) {
      reset();
    } else if (bottomEdge >= s.bottomBoundary) {
      const fixedTop = s.bottomBoundary - s.height;
      release(fixedTop);
    } else {
      const stickyTop = scrollTop + top;

      if (s.status !== STATUS.FIXED) {
        fix(stickyTop);
      } else {
        release(stickyTop);
      }
    }

    apply();
  };

  const apply = () => {
    if (!innerRef.current) return;

    const s = state.current;

    const style = innerRef.current.style;

    style.position = s.status === STATUS.RELEASED ? "relative" : "fixed";
    style.top = s.status === STATUS.RELEASED ? "" : `${top}px`;

    style.transform = `translate3d(0, ${s.status === STATUS.RELEASED ? s.pos : 0}px, 0)`;
    style.width = s.width ? `${s.width}px` : "";
  };

  const onScroll = () => {
    state.current.lastDelta = getScrollTop() - state.current.scrollTop;
    state.current.scrollTop = getScrollTop();

    if (raf.current) return;

    raf.current = requestAnimationFrame(() => {
      update();
      raf.current = null;
    });
  };

  const onResize = () => {
    measure();
    update();
  };

  useEffect(() => {
    if (!enabled) return;

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  return { outerRef, innerRef };
}
