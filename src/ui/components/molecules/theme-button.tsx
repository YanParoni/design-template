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

  return (
    <motion.button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      whileTap={{ scale: 0.9 }}
    >
      {/* Renderizar ambos os ícones, mas controlar a visibilidade com opacity */}
      <motion.div
        initial={{ opacity: resolvedTheme === 'dark' ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: resolvedTheme === 'dark' ? 0 : 1 }}
      >
        <SunIcon className='h-5 w-5 text-orange-300' />
      </motion.div>
      <motion.div
        initial={{ opacity: resolvedTheme === 'dark' ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: resolvedTheme === 'dark' ? 1 : 0 }}
      >
        <MoonIcon className='h-5 w-5 text-slate-800' />
      </motion.div>
    </motion.button>
  );
};

export default ThemeButton;
