import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useToast } from '@/hooks';

export default function PrivateRoute() {
  const { user } = useAuth();
  const { showToastMessage } = useToast();

  useEffect(() => {
    if (!user) {
      showToastMessage('You are not logged in.', 'danger');
    }
  }, [user, showToastMessage]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
