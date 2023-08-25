import {  useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../services/auth';

const Logout =() => {
    const navigate = useNavigate();
    LogoutUser();
    navigate('/login');
}

export default Logout;