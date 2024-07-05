import { motion } from "framer-motion";
import React from "react";

const TypingAnimation = () => {
  const delay = 0.3;
  return (
    <div className="flex items-center space-x-2">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="h-3 w-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * delay,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

export default TypingAnimation;
