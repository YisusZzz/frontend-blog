import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // El puerto donde corre tu servidor de Express
});

// Interceptor de peticiones:
// Cada vez que hagas una petición con "api", este código revisará si tienes un token guardado 
// en el navegador y lo enviará en las cabeceras automáticamente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});