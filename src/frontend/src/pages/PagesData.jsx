import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import ProfilePage from './ProfilePage';
import PrivateRoute from '@/components/PrivateRoute';

const PagesData = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
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
