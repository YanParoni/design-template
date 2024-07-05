import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "client/store";

interface NavigationLinksProps {
  onSignInClick: () => void;
  onCreateAccountClick: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  onSignInClick,
  onCreateAccountClick,
}) => {
  const { activeState } = useAuthStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-4"
      >
        {activeState === "default" && (
          <>
            <motion.a
              href="#"
              className="font-montserrat text-[14px] font-semibold text-description hover:text-white"
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
              className="font-montserrat text-[14px] font-semibold text-description hover:text-white"
              onClick={onCreateAccountClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              CREATE ACCOUNT
            </motion.a>
            <motion.a
              href=""
              className="font-montserrat text-[14px] font-semibold text-description hover:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              GAMES
            </motion.a>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default NavigationLinks;
