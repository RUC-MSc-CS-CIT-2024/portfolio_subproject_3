import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from '@/components';
import {
  HomePage,
  NotFoundPage,
  ProfilePage,
  UserListsPage,
  SignInPage,
  SearchPage,
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
            <Route path="search" element={<SearchPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="profile">
                <Route index element={<ProfilePage />} />
                <Route path="lists" element={<UserListsPage />} />
              </Route>
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
