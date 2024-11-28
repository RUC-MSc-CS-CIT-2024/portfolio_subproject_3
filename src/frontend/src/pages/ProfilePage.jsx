import { Container, Row, Col, Toast } from 'react-bootstrap';
import { updateUserById } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import UpdateProfileForm from '@/components/UpdateProfileForm/UpdateProfileForm';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');

  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUserById(updatedData, user.token);
      setToastMessage(
        'Profile updated successfully! You will be logged out in 3 seconds.',
      );
      setToastVariant('success');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        logout();
      }, 3000);
    } catch {
      setToastMessage('Error updating profile.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <Container>
      <h1>Profile settings</h1>
      <Row>
        <Col xs={12} md={6}>
          <UpdateProfileForm onSubmit={handleUpdateProfile} />
        </Col>
        <Col xs={0} md={6}></Col>
      </Row>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={toastVariant}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}
