import * as React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import useDeviceDetect from "@ui/hooks/use-device-detect";
export interface IChatVisibilityBtn {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ChatVisibilityBtn({ open, setOpen }: IChatVisibilityBtn) {
  const { isMobile } = useDeviceDetect();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: open ? -180 : 180,
      transition: {
        type: "spring",
        damping: 70,
        stiffness: 300,
      },
    });
  }, [open, controls, setOpen]);
  return (
    <div className="absolute top-[300px] items-center justify-center md:right-[10px] md:top-[10px] md:flex">
      <motion.div
        animate={controls}
        className="relative z-50 animate-bounce cursor-pointer rounded-full border-2 border-purple-500 bg-bkg-chat md:col-span-1 md:border-0"
        onClick={() => setOpen(!open)}
      >
        {isMobile ? (
          <>
            {open ? (
              <ChevronDoubleRightIcon className="h-8 fill-purple-500 stroke-purple-500" />
            ) : (
              <ChevronDoubleLeftIcon className="h-8 fill-purple-500 stroke-purple-500" />
            )}
          </>
        ) : (
          <>
            {open ? (
              <ChevronDoubleUpIcon className="h-8 fill-purple-500 stroke-purple-500" />
            ) : (
              <ChevronDoubleDownIcon className="h-8 fill-purple-500 stroke-purple-500" />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
