import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from '@/components/PrivateRoute';
import SignUpPage from './SignUpPage';

const PagesData = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    title: 'Sign Up',
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
    path: '*',
    element: <NotFoundPage />,
    title: 'Not Found',
  },
];

export default PagesData;
