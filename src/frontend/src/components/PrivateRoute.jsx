import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useToast } from '@/hooks';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const { showToastMessage } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      showToastMessage('You are not logged in.', 'danger');
    }
  }, [isAuthenticated, showToastMessage]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
