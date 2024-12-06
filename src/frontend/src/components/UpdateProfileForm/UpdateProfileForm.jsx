import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useToast } from '@/hooks';
import { isEmailValid } from '@/utils';

export default function UpdateProfileForm({ onSubmit, initialData }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToastMessage } = useToast();

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username || '');
      setEmail(initialData.email || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;
    if (!isEmailValid(email)) {
      showToastMessage('Invalid Email.', 'danger');
      return;
    }
    onSubmit(updatedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          autoComplete={username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          autoComplete={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          autoComplete={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        Update profile
      </Button>
    </Form>
  );
}
