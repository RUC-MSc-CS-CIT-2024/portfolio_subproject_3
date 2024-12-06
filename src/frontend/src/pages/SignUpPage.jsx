import { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '@/services/signUpService';
import { useToast } from '@/hooks';
import { isEmailValid } from '@/utils/validation';

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
    if (!isEmailValid(formData.email)) {
      showToastMessage({ message: 'Invalid Email.', variant: 'danger' });
      return;
    }
    try {
      await signUpUser(formData);
      showToastMessage({
        message: 'Sign-up successful! Redirecting to login...',
        variant: 'success',
      });
      setTimeout(() => {
        navigate('/'); // TODO: This I basiclly think should redirect us to the home page instead of the login page. and just log us in automatically or we should redirect to the profile page.
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
          Already have an account? <Link to="/">Login</Link>
        </Card.Footer>
      </Card>
    </Container>
  );
}
