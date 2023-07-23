import { useApi } from "../../composable/api"



export async function LoginUser (payload) {
    console.log(payload);
    const api = useApi();
    const response = await api.post('/auth/login', payload)
    if(response){
        localStorage.setItem('token', JSON.stringify(response.data.access_token));
        const token = JSON.parse(localStorage.getItem('token'));

        console.log('this is the token' , token);

        return true;
    }else{
        return false 
    }
}


export async function RegisterUser (payload) {
    const api = useApi();
    const response = await api.post('/auth/register', payload)
    if(response){
        localStorage.setItem('token', JSON.stringify(response.access_token));
        return true;
    }else{
        return false 
    }
}