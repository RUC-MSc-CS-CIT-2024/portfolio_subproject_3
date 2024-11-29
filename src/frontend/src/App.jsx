import { AuthProvider } from './contexts/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from '@/components';
import {
  HomePage,
  NotFoundPage,
  ProfilePage,
  ProfileSettingsPage,
  SignInPage,
} from '@/pages';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile-settings" element={<ProfileSettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
