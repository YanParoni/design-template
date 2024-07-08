import React, { useState } from "react";
import NavigationLinks from "@ui/components/molecules/navbar/navigation-links";
import LoginForm from "@ui/components/molecules/navbar/login-form";
import SignUpModal from "@ui/components/molecules/navbar/sign-up-modal";
import { useAuthStore } from "client/store";
import LoggedNavbar from "../logged-nav";

const DesktopContent: React.FC = () => {
  const { setActiveState } = useAuthStore();
  const [showNavigation, setShowNavigation] = useState(true);

  const handleSignInClick = () => {
    setTimeout(() => {
      setShowNavigation(false);
      setActiveState("login");
    }, 200);
  };

  const handleCloseClick = () => {
    setTimeout(() => {
      setActiveState("default");
      setTimeout(() => {
        setShowNavigation(true);
      }, 200);
    }, 200);
  };

  const handleCreateAccountClick = () => {
    setActiveState("signup");
  };

  const handleCloseModal = () => {
    setActiveState("default");
  };

  return (
    <>
      {showNavigation && (
        <NavigationLinks
          onSignInClick={handleSignInClick}
          onCreateAccountClick={handleCreateAccountClick}
        />
      )}
      <LoginForm onCloseClick={handleCloseClick} />
      <SignUpModal onClose={handleCloseModal} />
      <LoggedNavbar />
    </>
  );
};

export default DesktopContent;
