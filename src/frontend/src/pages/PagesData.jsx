import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import ProfilePage from './ProfilePage';
import ProfileSettingsPage from './ProfileSettingsPage';
import PrivateRoute from '@/components/PrivateRoute';
import SignInPage from './SignInPage';

const PagesData = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  {
    path: '/signin',
    element: <SignInPage />,
    title: 'Sign in',
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    title: 'Profile',
  },
  {
    path: '/profile-settings',
    element: (
      <PrivateRoute>
        <ProfileSettingsPage />
      </PrivateRoute>
    ),
    title: 'Profile Settings',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    title: 'Not Found',
  },
];

export default PagesData;
