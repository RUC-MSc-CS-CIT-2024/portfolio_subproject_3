import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import SearchForm from '@/components/SearchForm/SearchForm';
import LoginForm from '@/components/LoginForm/LoginForm';
import ToastNotification from '@/components/ToastNotification/ToastNotification';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';

export default function NavBar({ username }) {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const { showToastMessage } = useToast();

  const handleLoginResult = (success, message) => {
    showToastMessage(message, success ? 'success' : 'danger');
  };
  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!user) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MovieDB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <SearchForm />
            </Nav>
            {user ? (
              <Nav className="ms-auto d-flex flex-column flex-lg-row gap-3">
                <Nav.Link as={Link} to="/profile-settings">
                  <span className="d-flex gap-2">
                    <i className="bi bi-list-task"></i>
                    Bookmarks
                  </span>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <span className="d-flex gap-2">
                    <i className="bi bi-person-circle"></i>
                    {username ? username : 'User'}
                  </span>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/signin">
                  Sign in
                </Nav.Link>
                <NavDropdown
                  title="Login"
                  id="login-dropdown"
                  show={showLogin}
                  onToggle={handleToggle}
                  className="no-caret"
                >
                  <div onClick={handleFormClick}>
                    <LoginForm onLoginResult={handleLoginResult} />
                  </div>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastNotification />
    </>
  );
}
