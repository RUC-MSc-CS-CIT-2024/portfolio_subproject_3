import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth, useToast } from '@/hooks';
import { updateUserById, deleteUserById } from '@/services';
import { getUserFromSession } from '@/utils';
import { UpdateProfileForm, ToastNotification } from '@/components';

export default function ProfilePage() {
  const { logout, refresh } = useAuth();
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
      refresh();
    } catch {
      showToastMessage('Error updating profile.', 'danger');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteUserById();
      showToastMessage('Profile deleted successfully!', 'success');
      logout();
    } catch {
      showToastMessage('Error deleting profile.', 'danger');
    }
  };

  return (
    <Container className="d-flex flex-column pb-4">
      <h1>Profile settings</h1>
      <UpdateProfileForm
        className="w-25"
        onSubmit={handleUpdateProfile}
        initialData={initialData}
      />
      <div className="mt-4">
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
      </div>
      <ToastNotification />
    </Container>
  );
}
