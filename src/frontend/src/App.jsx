import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from '@/components';
import {
  HomePage,
  NotFoundPage,
  ProfilePage,
  SignUpPage,
  UserListsPage,
  MediaOverviewPage,
  MediaDetailPage,
  PersonDetailPage,
} from '@/pages';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="profile">
                <Route index element={<ProfilePage />} />
                <Route path="lists" element={<UserListsPage />} />
              </Route>
            </Route>
            <Route path="media" element={<MediaOverviewPage />} />
            <Route path="media/:id" element={<MediaDetailPage />} />
            <Route path="person/:id" element={<PersonDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
