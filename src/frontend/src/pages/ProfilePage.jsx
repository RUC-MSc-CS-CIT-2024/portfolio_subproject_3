import { Container, Row, Col, Toast, Button } from 'react-bootstrap';
import { updateUserById } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import UpdateProfileForm from '@/components/UpdateProfileForm/UpdateProfileForm';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb/DynamicBreadcrumb';
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

  const breadcrumbItems = [{ title: 'Home', path: '/' }, { title: 'Profile' }];

  return (
    <Container className="d-flex flex-column min-vh-100 pb-4">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <h1>Profile settings</h1>
      <Row className="flex-grow-1">
        <Col xs={12} md={6}>
          <UpdateProfileForm onSubmit={handleUpdateProfile} />
        </Col>
        <Col xs={0} md={6}></Col>
      </Row>
      <Row className="mt-auto">
        <Col>
          <Button
            variant="danger"
            onClick={logout}
            className="d-block d-md-inline-block mb-2 mb-md-0"
          >
            Delete profile
          </Button>
          <Button
            variant="dark"
            onClick={logout}
            className="d-block d-md-inline-block ms-md-2"
          >
            Log out
          </Button>
        </Col>
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
