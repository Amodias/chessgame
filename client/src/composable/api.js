import axios, { AxiosInstance } from 'axios'

let api;

export function createApi() {

    api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

  api.interceptors.request.use((config) => {
    
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('this is token',token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  

    return config
  })

  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}