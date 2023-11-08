import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface FilterItemProps {
    title: string
    children: React.ReactNode;
}
export default function FilterItem({ title, children }: FilterItemProps) {
    const [isCategoryOpen, setCategoryOpen] = React.useState<boolean>(false)

    const handleCategoryOpen = () => {
        setCategoryOpen(!isCategoryOpen)
    }

    return (
        <div className='divide-y-[1px] divide-purple-500   '>
            <div className='flex flex-col justify-between '>
                <div className='flex flex-row items-center justify-between  px-4 py-2 '>
                    <div className='font-semibold text-md  bg-bkg-chat  '>
                        {title}
                    </div>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isCategoryOpen ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }} className='bg-white/10 p-[1px]  rounded-full border-[1px] border-purple-500'
                    >
                        <ChevronRightIcon height={17} width={17} className='text-purple-500 cursor-pointer' onClick={handleCategoryOpen} />
                    </motion.div>
                </div>
            </div>
            <AnimatePresence >
                {isCategoryOpen && (
                    <motion.div
                        key={title}
                        initial={{ height: 0, overflow: 'hidden' }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0, }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {children}
                    </motion.div>
                )
                }
            </AnimatePresence>
            <div>
            </div>
        </div>
    )
}