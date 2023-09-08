import * as React from 'react';
import { useEffect } from 'react';
import { motion, useAnimation,  } from 'framer-motion';
import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon, ChevronDoubleUpIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import useDeviceDetect from '@ui/hooks/use-device-detect';
export interface IChatVisibilityBtn {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ChatVisibilityBtn({ open, setOpen }: IChatVisibilityBtn) {
  const { isMobile } = useDeviceDetect()
  const controls = useAnimation();

  useEffect(() => {
      controls.start({
        rotate: open ?  -180 : 180,
        transition: {
          type: 'spring',
          damping: 70,
          stiffness: 300,
        },
      });
  }, [open,  controls, setOpen]);
  return (
    <div className='absolute top-[300px]  items-center justify-center md:top-[10px]  md:flex md:right-[10px]'>
      <motion.div 
      animate={controls} 
      className="relative md:col-span-1 cursor-pointer bg-bkg-chat rounded-full  z-50  border-l-2 border-r-2 md:border-0 border-l-purple-500 border-[#515151]  "
      onClick={() => setOpen(!open)}>
        {isMobile ?
          <>
            {open ?
                <ChevronDoubleRightIcon className=" h-8 fill-purple-500 stroke-purple-500" />
               :
                <ChevronDoubleLeftIcon className=" h-8 fill-purple-500 stroke-purple-500" />
            }
          </>
          :
          <>
            {open ?
              <ChevronDoubleUpIcon className=" h-8 fill-purple-500 stroke-purple-500" /> :
              <ChevronDoubleDownIcon className=" h-8 fill-purple-500 stroke-purple-500" />
            }
          </>
        }
      </motion.div>
    </div>
  );
}
