import { useEffect, useState, useCallback } from "react";

export default function usePopoverPosition(
  anchorRef,
  open,
  popoverHeight = 120,
) {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const calculatePosition = useCallback(() => {
    if (!anchorRef?.current) return;

    const rect = anchorRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldOpenAbove =
      spaceBelow < popoverHeight && spaceAbove > popoverHeight;

    setPosition({
      top: shouldOpenAbove ? rect.top : rect.bottom,
      left: rect.left + rect.width / 2,
    });
  }, [anchorRef, popoverHeight]);

  useEffect(() => {
    if (!open) return;

    calculatePosition();

    window.addEventListener("resize", calculatePosition, true);
    window.addEventListener("scroll", calculatePosition, true);

    return () => {
      window.removeEventListener("resize", calculatePosition, true);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [open, calculatePosition]);

  return position;
}
