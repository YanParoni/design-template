import { motion, AnimatePresence } from 'framer-motion';
import UserDropdown from '../user-dropdown';
import { useAuthStore } from 'client/store';

interface NavigationLinksProps {
  onSignInClick: () => void;
  onCreateAccountClick: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  onSignInClick,
  onCreateAccountClick,
}) => {
  const { activeState, setActiveState, logout } = useAuthStore();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex space-x-4 items-center "
      >
        {activeState === 'default' && (
          <>
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
          href=""
          className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          GAMES
        </motion.a>
          </>
        )}
        <UserDropdown />
      </motion.div>
    </AnimatePresence>
  );
};

export default NavigationLinks;
