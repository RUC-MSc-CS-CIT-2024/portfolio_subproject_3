import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap/';
import { useAuth, useSearch, useToast } from '@/hooks';
import { SearchForm, LoginForm, ToastNotification } from '@/components';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';
import logo from '/favicon-32x32.png';

export default function NavBar() {
  const { isAuthenticated, user } = useAuth();
  const { searchWithNavigation } = useSearch();
  const { showToastMessage } = useToast();
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);

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
    if (!isAuthenticated) {
      setShowLogin(false);
    }
  }, [isAuthenticated]);

  const isSearchHidden =
    location.pathname === '/search' || location.pathname === '/';

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2"
          >
            <Image
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="MovieDB logo"
              rounded
            />
            <p className="mb-0 mt-2">MovieDB</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isSearchHidden && (
                <SearchForm onSearch={(e) => searchWithNavigation(e)} />
              )}
            </Nav>
            {isAuthenticated ? (
              <Nav className="ms-auto d-flex flex-column flex-lg-row gap-3">
                <Nav.Link as={Link} to="/profile/lists">
                  <span className="d-flex gap-2">
                    <i className="bi bi-list-task"></i>
                    Bookmarks
                  </span>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <span className="d-flex gap-2">
                    <i className="bi bi-person-circle"></i>
                    {user && user.username ? user.username : 'User'}
                  </span>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <NavDropdown
                  title="Login"
                  id="login-dropdown"
                  show={showLogin}
                  onToggle={handleToggle}
                  className="no-caret"
                >
                  <div onClick={handleFormClick} className="login-container">
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
