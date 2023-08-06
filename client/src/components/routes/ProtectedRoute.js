import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckAuthentication } from '../../services/auth';

const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function fetchAuthentication() {
      const isAuthenticated = await CheckAuthentication();
      setIsAuthenticated(isAuthenticated);
      setIsLoading(false); 
    }
    fetchAuthentication();
  }, []);

  if (isLoading) {
    
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
