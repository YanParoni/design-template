import Modal from "@ui/components/atoms/modal";
import SignUpForm from "@ui/components/molecules/navbar/sign-up-form";
import { useNavStore } from "client/store";

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const { activeState } = useNavStore();

  return (
    <Modal
      title="Join Playboxd"
      isVisible={activeState === "signup"}
      onClose={onClose}
    >
      <SignUpForm onClose={onClose} />
    </Modal>
  );
};

export default SignUpModal;
