import React, { useState } from 'react';
import '../../styles/Authentification.css'; // CSS file for styling
import SpaceBackground from '../../components/particels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faChess } from '@fortawesome/free-solid-svg-icons';
import { RegisterUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('s');
  const [email, setEmail] = useState('s@s.s');
  const [password, setPassword] = useState('123');
  const [confirmPassword, setConfirmPassword] = useState('123');
  const [validationError , setValidationError] = useState('')
  const navigate = useNavigate();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload =  { username  , email, password} ;
    RegisterUser(payload)
    .then((result) => {
      if(result.status) navigate('/') ;
    })
    .catch((error) => {
      setValidationError(error.message)
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="background-container">
        <SpaceBackground />
      </div>
      <div className="register-form">
        <div className="form-header">
          <FontAwesomeIcon icon={faChess} />
          <h3 style={{ marginLeft: '10px' }}>Register</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="icon" />
          </div>
          {validationError && (
              <div className='my-2'>
                <p>{validationError}</p>
              </div>
                )
            }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
