import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import './login.css';
import { useLogin } from '../../redux/apiCalls';
import Footer from '../../components/footer/Footer';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { login, error, loadingSpinner } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();

    // Perform login action
    await login(dispatch, {username, password});
  }


  return (
    <div className="login">
      <div className="loginTopbar">
        <span className="loginLogo">
          Luxel<span>i</span>
        </span>
      </div>
      <form className="loginForm">
        <h3 className="loginTitle">Log In</h3>
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="loginInput"
          type="text"
          placeholder="ramoni"
        />
        <label>Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="loginInput"
          type="password"
          placeholder="******"
        />
        <button onClick={handleClick} className="loginButton">
        {loadingSpinner ? <CircularProgress size={20} style={{ color: 'white'}} /> : "LOGIN"}
        </button>
        {error && <p className='loginError'>{error}</p>} {/* Display the error if it exists */}
        <span className='loginForgot'>forgot password ?<a href="https://localhost:3000/">click here</a></span>
      </form>
      <div className="ftrContainer">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
