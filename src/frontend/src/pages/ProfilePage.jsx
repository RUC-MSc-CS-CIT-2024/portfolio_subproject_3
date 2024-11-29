import { Container, Row, Col, Button } from 'react-bootstrap';
import { updateUserById, deleteUserById } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import UpdateProfileForm from '@/components/UpdateProfileForm/UpdateProfileForm';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb/DynamicBreadcrumb';
import { useState, useEffect } from 'react';
import { getUserFromSession } from '@/utils/getUserFromSession';
import { useToast } from '@/hooks/useToast';
import ToastNotification from '../components/ToastNotification/ToastNotification';

export default function ProfilePage() {
  const { logout } = useAuth();
  const { showToastMessage } = useToast();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const userData = getUserFromSession();
    setInitialData(userData);
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUserById(updatedData);
      showToastMessage(
        'Profile updated successfully! You will be logged out in 3 seconds.',
        'success',
      );
      setTimeout(() => {
        logout();
      }, 3000);
    } catch {
      showToastMessage('Error updating profile.', 'danger');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteUserById();
      showToastMessage('Profile deleted successfully!', 'success');
      setTimeout(() => {
        logout();
      }, 3000);
    } catch {
      showToastMessage('Error deleting profile.', 'danger');
    }
  };

  const breadcrumbItems = [{ title: 'Home', path: '/' }, { title: 'Profile' }];

  return (
    <Container className="d-flex flex-column min-vh-100 pb-4">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <h1>Profile settings</h1>
      <Row className="flex-grow-1">
        <Col xs={12} md={6}>
          <UpdateProfileForm
            onSubmit={handleUpdateProfile}
            initialData={initialData}
          />
        </Col>
        <Col xs={0} md={6}></Col>
      </Row>
      <Row className="mt-auto">
        <Col>
          <Button
            variant="danger"
            onClick={handleDeleteProfile}
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
      <ToastNotification />
    </Container>
  );
}
