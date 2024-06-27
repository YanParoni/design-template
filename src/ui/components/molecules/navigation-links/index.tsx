import { motion, AnimatePresence } from 'framer-motion';

interface NavigationLinksProps {
  onSignInClick: () => void;
  onCreateAccountClick: () => void;
  isVisible: boolean;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ onSignInClick, onCreateAccountClick, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex space-x-4"
      >
        <motion.a
          href="#"
          className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
          onClick={onSignInClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          SIGN IN
        </motion.a>
        <motion.a
          href="#"
          className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
          onClick={onCreateAccountClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          CREATE ACCOUNT
        </motion.a>
        <motion.a
          href="#"
          className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          GAMES
        </motion.a>
      </motion.div>
    )}
  </AnimatePresence>
);

export default NavigationLinks;
