import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div>
      <h1>Homepage</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>

      {user ? (
        <div>
          <p>Logged in as {user.token}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
        </div>
      )}
    </div>
  );
}
