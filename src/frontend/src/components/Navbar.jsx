import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function NavBar({ username }) {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MovieDB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form className="d-flex my-3">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                size="sm"
              />
              <Button variant="dark" size="sm">
                <span className="d-flex gap-2">
                  <i className="bi bi-search"></i> Search
                </span>
              </Button>
            </Form>
          </Nav>
          {user ? (
            <Nav className="ms-auto d-flex flex-column flex-lg-row gap-3">
              <Nav.Link as={Link} to="/profile">
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
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
