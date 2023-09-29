import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import '../../styles/Authentification.css'; 
import SpaceBackground from '../../components/particels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock ,faChess } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../../services/auth';
const Login = () => {
  const [username, setUsername] = useState('s@s.s');
  const [password, setPassword] = useState('123');
  const [validationError , setValidationError] = useState('')
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginUser({username, password})
    .then((result) => {
      if(result.status) navigate('/') ;
    })
    .catch((error) => {
      error.message ? setValidationError(error.message) : setValidationError("Server Error")
    });
    
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
                <input onChange={(e) => handleUsernameChange(e)} value={username} type="email" className="form-control" placeholder="Email" />
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
            <div className="form-group">
                <input onChange={(e) => handlePasswordChange(e)} value={password} type="password" className="form-control" placeholder="Password" />
                <FontAwesomeIcon icon={faLock} className="icon" />
            </div>
            <div className="form-group form-inline">
                <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" >Remember Me</label>
                </div>
                <a class="form-pwd-reset" href="">Forgot password ?</a>
                
            </div>
            {validationError && (
              <div className='my-2'>
                <p>{validationError}</p>
              </div>
                )
            }
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
