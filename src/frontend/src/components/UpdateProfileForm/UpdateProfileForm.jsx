import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function UpdateProfileForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    if (username) updatedData.username = username;
    if (password) updatedData.password = password;
    if (email) updatedData.email = email;
    onSubmit(updatedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        Update your profile
      </Button>
    </Form>
  );
}
