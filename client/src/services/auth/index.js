import { useApi } from "../../composable/api"


export function LoginUser(payload) {
  const api = useApi();
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post('/api/auth/login', payload);
      localStorage.setItem('token', JSON.stringify(response.data.access_token));
      resolve({ status: true });
    } catch (error) {
      reject({ status: false, message: error.response.data.message });
    }
  });
}


export  function RegisterUser (payload) {
  const api = useApi();
  return new Promise(async (resolve,reject)=> { 
    try { 
    const response =   await api.post('/api/auth/register', payload);
    localStorage.setItem('token', JSON.stringify(response.data.access_token));
    resolve({ status: true });
  } catch (error) {
    console.log(error.res);
    reject({ status: false, message: error.response.data.message });
  }
  })
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