import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../api/axios';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    usuario: '',
    contrasena: '',
    fotoPerfil: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Petición POST
      const response = await api.post('/register', formData);
      setSuccess(response.data.message || '¡Registro exitoso!');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        
        setError(err.response.data.error || 'Ocurrió un error al registrarse.');
      } else {
        setError('No se pudo establecer conexión con el servidor.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Crea tu cuenta</h2>
          <p className="mt-2 text-sm text-gray-500">Únete a nuestra comunidad hoy mismo</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg text-center font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Juan Pérez" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input required type="text" name="usuario" value={formData.usuario} onChange={handleChange} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="juanperez" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="tu@correo.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña (Mín. 6 caracteres)</label>
            <input required type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Enlace de Foto de Perfil</label>
            <input required type="url" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="https://ejemplo.com/foto.jpg" />
          </div>

          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-colors">
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};