import Modal from '@ui/components/organisms/modal';
import SignUpForm from '@ui/components/molecules/navbar/sign-up-form';

interface SignUpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isVisible, onClose }) => (
  <Modal title="Join Playboxd" isVisible={isVisible} onClose={onClose}>
    <SignUpForm />
  </Modal>
);

export default SignUpModal;
