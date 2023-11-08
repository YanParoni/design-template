import React from 'react';
import { motion } from 'framer-motion';

enum Options {
    Filter,
    Sort,
}

interface ISortFilterSelector{
    selectedOption:Options
    select: (item: Options) => void
}

const SortFilterSelector = ({selectedOption, select}:ISortFilterSelector) => {


    return (
        <div className='relative flex flex-col w-full'>
            <div className='flex flex-row w-full'>
                <div
                    className={`w-1/2 text-base text-center font-bold px-4 py-2 cursor-pointer ${selectedOption === Options.Sort ? 'text-purple-500' : ''
                        }`}
                    onClick={() => select(Options.Filter)}
                >
                    Filter
                </div>
                <div
                    className={`w-1/2 text-base text-center font-bold px-4 py-2 cursor-pointer ${selectedOption === Options.Filter ? 'text-purple-500' : ''
                        }`}
                    onClick={() => select(Options.Sort)}
                >
                    Sort
                </div>
            </div>
            <motion.div
                initial={{ width: '50%', right: '50%' }}
                animate={{ right: selectedOption === Options.Filter ? '50%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='absolute bottom-0 bg-purple-500 h-[4px] rounded-3xl'
            />
        </div>
    );
};

export default SortFilterSelector;
