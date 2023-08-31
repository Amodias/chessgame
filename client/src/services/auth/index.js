import { useApi } from "../../composable/api"


export async function LoginUser (payload) {
    const api = useApi();
    const response = await api.post('/api/auth/login', payload)
    if(response){
        localStorage.setItem('token', JSON.stringify(response.data.access_token));
        return true;
    }else{
        return false 
    }
}


export async function RegisterUser (payload) {
    const api = useApi();
    const response = await api.post('/api/auth/register', payload)
    if(response){
        localStorage.setItem('token', JSON.stringify(response.access_token));
        return true;
    }else{
        return false 
    }
}
export async function CheckAuthentication  ()  {
    const api = useApi();
    try {
      const response = await api.get('/api/auth/verify-token');
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };


  export async function LogoutUser  ()  {
    localStorage.removeItem('token');

  };