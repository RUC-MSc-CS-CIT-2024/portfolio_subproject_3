import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './pages/router';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}
