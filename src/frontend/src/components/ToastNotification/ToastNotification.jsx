import { Toast } from 'react-bootstrap';
import { useToast } from '@/hooks/useToast';

export default function ToastNotification() {
  const { toastMessage, toastVariant, showToast, showToastMessage } =
    useToast();

  return (
    <Toast
      onClose={() => showToastMessage(null)}
      show={showToast}
      delay={3000}
      autohide
      bg={toastVariant}
      className="position-fixed bottom-0 end-0 m-3"
    >
      <Toast.Body className="text-white">{toastMessage}</Toast.Body>
    </Toast>
  );
}
