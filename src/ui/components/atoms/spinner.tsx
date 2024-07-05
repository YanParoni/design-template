import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-36 w-36 rounded-full border-[8px] border-b-accent-theme border-l-accent-theme/20 border-r-accent-theme border-t-accent-theme"
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
