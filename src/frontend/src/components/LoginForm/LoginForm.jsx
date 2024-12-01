import { useState } from 'react';
import { useAuth } from '@/hooks';
import { Button, Form } from 'react-bootstrap';
import './LoginForm.css';

export default function LoginForm({ onLoginResult }) {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      onLoginResult(true, 'Login successful. Welcome!');
    } catch {
      onLoginResult(false, 'Login failed. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 login-form">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          autoComplete={credentials.username}
          placeholder="Enter username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          autoComplete={credentials.password}
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </Form.Group>
      <Button variant="dark" size="sm" type="submit" className="mt-3">
        Login
      </Button>
    </Form>
  );
}
