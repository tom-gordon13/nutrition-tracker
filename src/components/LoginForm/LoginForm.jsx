import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import './LoginForm.css'

export default function LoginForm({ setUser, setFormDisplay }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  function handleButtonClick(evt) {
    setFormDisplay(evt.target.value)
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className='login-form d-flex flex-column'>
        <div className="form-container d-flex flex-column">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <span></span><h1 className='w-100 form-title'>Login</h1>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message-login">&nbsp;{error}</p>
      <div className="bottom-login">
          <hr />
          <h5>Don't have an account yet?</h5>
          <button className='w-75 d-inline' value='Sign Up' onClick={handleButtonClick}>Sign Up</button>
        </div>
    </div>
  );
}