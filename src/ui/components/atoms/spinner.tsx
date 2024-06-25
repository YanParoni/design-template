import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <motion.div
        className="relative border-[8px] border-t-accent-theme border-r-accent-theme border-b-accent-theme border-l-accent-theme/20 rounded-full w-36 h-36"
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
