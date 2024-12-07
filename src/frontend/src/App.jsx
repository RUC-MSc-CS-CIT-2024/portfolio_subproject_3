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
  SearchPage,
  MediaOverviewPage,
  MediaDetailPage,
  PersonOverviewPage,
  PersonDetailPage,
} from '@/pages';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="profile">
                <Route index element={<ProfilePage />} />
                <Route path="lists" element={<UserListsPage />} />
              </Route>
            </Route>
            <Route path="media">
              <Route index element={<MediaOverviewPage />} />
              <Route path=":id" element={<MediaDetailPage />} />
            </Route>
            <Route path="persons">
              <Route index element={<PersonOverviewPage />} />
              <Route path=":id" element={<PersonDetailPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
