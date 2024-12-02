import { useState } from 'react';
import { Button, Form, Container, Card, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '@/services/signUpService';
import { useToast } from '@/hooks';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { showToastMessage } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(formData);
      showToastMessage({
        message: 'Sign-up successful! Redirecting to login...',
        variant: 'success',
      });
      setTimeout(() => {
        navigate('/login'); // TODO: This I basiclly think should redirect us to the home page instead of the login page. and just log us in automatically or we should redirect to the profile page.
      }, 3000);
    } catch (error) {
      showToastMessage({
        message: error.message || 'Sign-up failed. Please try again.',
        variant: 'danger',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Create Your Account
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center text-muted">
          Already have an account? <a href="/login">Login</a>
        </Card.Footer>
      </Card>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={toastVariant}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}
