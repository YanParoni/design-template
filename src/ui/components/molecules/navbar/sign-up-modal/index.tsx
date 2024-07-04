import Modal from '@ui/components/organisms/modal';
import SignUpForm from '@ui/components/molecules/navbar/sign-up-form';
import { useAuthStore } from 'client/store';

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => { 
  const { activeState } = useAuthStore();

  return(
  <Modal title="Join Playboxd" isVisible={activeState === 'signup'} onClose={onClose}>
    <SignUpForm />
  </Modal>
);
}

export default SignUpModal;
