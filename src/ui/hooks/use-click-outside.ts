import { RefObject, useEffect } from "react";

export function useClickOutside(
  ref: RefObject<any>,
  fnAfterClick: () => void,
  ...someStates: any[]
) {
  useEffect(() => {
    const handleClickOut = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fnAfterClick();
      }
    };

    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [ref, fnAfterClick, ...someStates]);
}
