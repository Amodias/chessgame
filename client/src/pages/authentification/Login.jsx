import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Authentification.css'; 
import SpaceBackground from '../../components/particels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock ,faChess } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../../services/auth';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = LoginUser({username, password}); 
    // console.log(response);
  };

  return (
    <div className="auth-wrapper">
         <div className="background-container">
           <SpaceBackground />
         </div>
        <div className="login-form">
            <div className='form-header'> 
            <FontAwesomeIcon icon={faChess} />
            <h2 style={{marginLeft:'10px'}}>Login  </h2>
            </div>
            <form>
            <div className="form-group">
                <input onChange={(e) => handleUsernameChange(e)} type="email" className="form-control" placeholder="Email" />
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
            <div className="form-group">
                <input onChange={(e) => handlePasswordChange(e)} type="password" className="form-control" placeholder="Password" />
                <FontAwesomeIcon icon={faLock} className="icon" />
            </div>
            <div className="form-group form-inline">
                <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" >Remember Me</label>
                </div>
                <a class="form-pwd-reset" href="">Forgot password ?</a>
                
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Login</button>
            <div>
            <Link to="/register" className="link-create-account">
              Or Create an account.
            </Link>
                
            </div>
            </form>
       </div>
    </div>

  );
};

export default Login;
