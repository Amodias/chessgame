import { useApi } from "../../composable/api"


export function LoginUser(payload) {
  const api = useApi();
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post('/api/auth/login', payload);
      const status = response.data.status;
      if (status) localStorage.setItem('token', JSON.stringify(response.data.access_token));
      resolve({ status: status });
    } catch (error) {
      console.log(error.response.data.message);
      reject({ status: false, error: error.response.data.message });
    }
  });
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
      console.error('Error while checking authentication:', error);
      return false;
    }
  };


  export async function LogoutUser  ()  {
    localStorage.removeItem('token');

  };