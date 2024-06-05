import { useState } from 'react';
import './Auth.css';

function Auth() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Auth-container">
      <form
        action="http://localhost:8000/login/password"
        method="post"
        className="loginForm"
      >
        <div className="inputDiv">
          <label htmlFor="email" className="formLabel">
            Login :{' '}
          </label>
          <input
            id="email"
            className="formInput"
            name="email"
            placeholder="Enter your login"
            type="text"
            autoComplete="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="password" className="formLabel">
            Password :{' '}
          </label>
          <input
            id="password"
            className="formInput"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="submitDiv">
          <button type="submit" className="submitButton">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
