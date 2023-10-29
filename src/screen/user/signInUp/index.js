import React, { useState } from 'react';
// 스타일 파일 추가
import './style.scss';

const SignInUpScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    // Validate the email and password here
    if (!email || !password || !name) {
      setErrorMessage('All fields are required');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.',
      );
    } else {
      // Perform your signup logic here
      // e.g., make an API request to register the user
    }
  };

  const handleSignIn = () => {
    // Validate the email and password here
    if (!email || !password) {
      setErrorMessage('Email and password are required');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
    } else {
      // Perform your sign-in logic here
      // e.g., make an API request to authenticate the user
    }
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here
    // You can use regular expressions or other validation methods
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    // Implement your password validation logic here
    // This example enforces a minimum length of 8 characters and requires a combination of letters, numbers, and special characters.
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };
  return (
    <div className={`Lcontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      {/* <img src="guitar-2428921_1920 2.svg" className='login-img'></img> */}
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div
        className={`form-container sign-in-container ${isSignUp ? 'temp' : ''}`}
      >
        <form action="#">
          <h1>Sign in</h1>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button onClick={handleSignIn}>Sign In</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div className="overlay-container">
        <div
          className={`overlay ${isSignUp ? 'overlay-right' : 'overlay-left'}`}
        >
          <h1>{isSignUp ? 'Hello, Beat Member!' : 'Welcome Back!'}</h1>
          <p>
            {isSignUp
              ? 'Enter your personal details and start your journey with us'
              : 'To keep connected with us please login with your personal info'}
          </p>

          <button
            className="ghost"
            onClick={isSignUp ? handleSignInClick : handleSignUpClick}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInUpScreen;
