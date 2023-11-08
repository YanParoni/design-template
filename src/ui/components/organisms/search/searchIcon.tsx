import React from 'react';
import { motion } from 'framer-motion';

interface sd {
    isAnimationActive: boolean;
}
const SeuComponente = ({ isAnimationActive }: sd) => {
    return (
        <svg  viewBox="0 0 136 136" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame 2" clipPath="url(#clip0_3_21)">
                <g id="settings">
                    <g id="Lines">
                        <g id="Line 1" filter="url(#filter0_d_3_21)">
                            <path d="M65.4866 4.99748L65.4866 124.997" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                        </g>
                        <path id="Line 2" d="M21.7837 6L21.7837 126" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                        <path id="Line 3" d="M116.136 126L116.136 6.00377" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    </g>
                    <motion.g id="twoDots"
                     initial={{ y: 0, }} 
                     animate={{
                       y: isAnimationActive ? 60 : 0, 
                     }}
                     transition={{ duration: 0.5 }}
                    >
                        <g id="fullCircle3">
                            <circle id="outerDot3" cx="22" cy="33" r="15" fill="currentColor" />
                            <circle id="innerDot3" cx="22" cy="33" r="10" className='text-bkg-chat'  />
                        </g>
                        <g id="fullCircle2">
                            <circle id="outerDot2" cx="117" cy="33" r="15" fill="currentColor" />
                            <circle id="innerDot2" cx="117" cy="32.871" r="10"  className='text-bkg-chat'  />
                        </g>
                    </motion.g>
                    <g id="loneDot">
                        <motion.circle id="outerDot1" cx="66" cy="100" r="15" fill="currentColor" 
                            animate={{
                              y: isAnimationActive ? -60 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.circle id="innerDot1" cx="66" cy="100" r="10" className='text-bkg-chat'
                         animate={{
                           y: isAnimationActive ? -60 : 0,
                         }}
                         transition={{ duration: 0.5 }}
                        />
                    </g>
                </g>
            </g>
            <defs>
                <filter id="filter0_d_3_21" x="57.4866" y="0.997467" width="16" height="136" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_21" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_21" result="shape" />
                </filter>
                <clipPath id="clip0_3_21">
                    <rect width="136" height="136" fill="white" />
                </clipPath>
            </defs>
        </svg>



    );
};

export default SeuComponente;
