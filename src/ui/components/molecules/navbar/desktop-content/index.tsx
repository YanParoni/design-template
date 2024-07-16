import React, { useState, useEffect } from "react";
import NavigationLinks from "@ui/components/molecules/navbar/navigation-links";
import LoginForm from "@ui/components/molecules/navbar/login-form";
import SignUpModal from "@ui/components/molecules/navbar/sign-up-modal";
import { useNavStore } from "client/store";
import LoggedNavbar from "../logged-nav";
import { AnimatePresence } from "framer-motion";

const DesktopContent: React.FC = () => {
  const { setActiveState, activeState } = useNavStore();
  const [showNavigationLinks, setShowNavigationLinks] = useState(true);

  useEffect(() => {
    if (activeState === "login") {
      setShowNavigationLinks(false);
    } else if (activeState === "default") {
      const timer = setTimeout(() => {
        setShowNavigationLinks(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeState]);

  const handleSignInClick = () => {
    setTimeout(() => {
      setActiveState("login");
    }, 200);
  };

  const handleCloseClick = () => {
    setTimeout(() => {
      setActiveState("default");
    }, 300);
  };

  const handleCreateAccountClick = () => {
    setActiveState("signup");
  };

  const handleCloseModal = () => {
    setActiveState("default");
  };

  return (
    <>
      <AnimatePresence>
        {showNavigationLinks && activeState === "default" && (
          <NavigationLinks
            onSignInClick={handleSignInClick}
            onCreateAccountClick={handleCreateAccountClick}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeState === "login" && <LoginForm onCloseClick={handleCloseClick} />}
      </AnimatePresence>
      <SignUpModal onClose={handleCloseModal} />
      <LoggedNavbar />
    </>
  );
};

export default DesktopContent;
