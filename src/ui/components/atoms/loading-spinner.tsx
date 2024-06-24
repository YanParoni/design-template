import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <motion.div
        className="relative border-[8px] border-t-[#dd00da] border-r-[#dd00da] border-b-[#dd00da] border-l-[#dd00da]/20 rounded-full w-36 h-36"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Spinner;
