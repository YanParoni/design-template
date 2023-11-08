'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  const themeVariants = {
    dark: {
      x: 17,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
    light: {
     x: -17,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };


  return (
    <motion.div
      role="switch"
      aria-label='Toggle Theme Mode'
      className='flex items-center justify-around m-4 rounded-full bg-gray-400 transition-colors w-10 hover:bg-zinc-100 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <motion.div className='bg-bkg rounded-full shadow-md '
      variants={themeVariants}
      animate={resolvedTheme === 'dark'? 'dark':'light'}
      >
        {resolvedTheme ==='light' ?
          <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0 , transition: {duration:1}}} exit={{opacity:0, y:20, transition: {duration:1}}}>
            <SunIcon  className='h-5 w-5 fill-amber-300 stroke-amber-300' />
          </motion.div>
          : <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0, transition: {duration:1}}} exit={{opacity:0, y:20, transition: {duration:1}}}>
            <MoonIcon className='h-5 w-5 fill-purple-500 stroke-purple-500' />
          </motion.div>
        }
      </motion.div>
    </motion.div>
  );
};

export default ThemeButton;
