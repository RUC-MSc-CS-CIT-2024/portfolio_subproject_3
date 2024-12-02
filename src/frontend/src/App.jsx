import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from '@/components';
import {
  HomePage,
  NotFoundPage,
  ProfilePage,
  ProfileSettingsPage,
  SignInPage,
  MediaOverviewPage,
  MediaDetailPage,
} from '@/pages';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route
                path="profile-settings"
                element={<ProfileSettingsPage />}
              />
            </Route>
            <Route path="media" element={<MediaOverviewPage />} />
            <Route path="media/:id" element={<MediaDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
