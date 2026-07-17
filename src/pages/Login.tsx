import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../api/axios';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      
      const response = await api.post('/login', { usuario, contrasena });
      
      
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      
      
      navigate('/feed');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Credenciales incorrectas.');
      } else {
        setError('No se pudo establecer conexión con el servidor.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">¡Bienvenido de vuelta!</h2>
          <p className="mt-2 text-sm text-gray-500">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input required type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Tu usuario" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input required type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors">
            Iniciar Sesión
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};