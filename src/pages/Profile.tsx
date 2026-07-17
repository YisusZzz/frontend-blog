import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/axios';
import axios from 'axios';

interface UsuarioData {
  nombre: string;
  correo: string;
  usuario: string;
  fotoPerfil: string;
}

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UsuarioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  // Estados para el formulario de cambio de contraseña
  const [mostrarForm, setMostrarForm] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 400)) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setProfileError('No se pudieron cargar los datos del perfil.');
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [navigate]);

  // Manejador para el cambio de contraseña real
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    // Validación básica en el cliente
    if (nuevaContrasena !== confirmarContrasena) {
      setPwdError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    if (nuevaContrasena.length < 6) {
      setPwdError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // Tu backend espera: { contrasena_actual, nueva_contrasena }
      const response = await api.post('/change-password', {
        contrasena_actual: contrasenaActual,
        nueva_contrasena: nuevaContrasena
      });

      setPwdSuccess(response.data.message || 'Contraseña actualizada con éxito.');
      
      // Limpiar campos del formulario
      setContrasenaActual('');
      setNuevaContrasena('');
      setConfirmarContrasena('');
      
      // Ocultar formulario después de 2.5 segundos de éxito
      setTimeout(() => {
        setMostrarForm(false);
        setPwdSuccess('');
      }, 2500);

    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      if (axios.isAxiosError(err) && err.response) {
        setPwdError(err.response.data.error || 'Ocurrió un error al intentar cambiar la contraseña.');
      } else {
        setPwdError('No se pudo establecer conexión con el servidor.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <p className="text-gray-600 font-semibold text-lg">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      
      {/* Barra de Navegación Básica */}
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/feed')}>Mi App</h1>
          <Link to="/me" className="text-sm font-semibold underline">Mi Perfil</Link>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold bg-blue-700 rounded hover:bg-blue-800 transition-colors"
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido del Perfil */}
      <main className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow space-y-6">
        {profileError ? (
          <div className="text-center text-red-500 font-medium p-4">
            {profileError}
          </div>
        ) : user ? (
          <div className="space-y-6">
            
            {/* Foto e Información General */}
            <div className="text-center space-y-4">
              <img 
                src={user.fotoPerfil} 
                alt={user.nombre} 
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://avatar.iran.liara.run/public";
                }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.nombre}</h2>
                <p className="text-gray-500">@{user.usuario}</p>
                <p className="text-sm text-gray-400 mt-1">{user.correo}</p>
              </div>
            </div>
            
            <hr className="border-gray-200" />
            
            
            <div className="space-y-4">
              <button 
                onClick={() => setMostrarForm(!mostrarForm)}
                className="w-full py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {mostrarForm ? '✕ Cancelar cambio de contraseña' : ' Cambiar Contraseña'}
              </button>

              {mostrarForm && (
                <form onSubmit={handleChangePassword} className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all">
                  <h3 className="text-sm font-bold text-gray-700">Actualizar Credenciales</h3>
                  
                  {pwdError && (
                    <div className="p-2 text-xs text-red-700 bg-red-100 rounded text-center font-medium">
                      {pwdError}
                    </div>
                  )}
                  {pwdSuccess && (
                    <div className="p-2 text-xs text-green-700 bg-green-100 rounded text-center font-medium">
                      {pwdSuccess}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Contraseña Actual</label>
                    <input 
                      required 
                      type="password" 
                      value={contrasenaActual} 
                      onChange={(e) => setContrasenaActual(e.target.value)}
                      className="w-full px-3 py-1.5 mt-1 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Nueva Contraseña (Mín. 6 caracteres)</label>
                    <input 
                      required 
                      type="password" 
                      value={nuevaContrasena} 
                      onChange={(e) => setNuevaContrasena(e.target.value)}
                      className="w-full px-3 py-1.5 mt-1 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Confirmar Nueva Contraseña</label>
                    <input 
                      required 
                      type="password" 
                      value={confirmarContrasena} 
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      className="w-full px-3 py-1.5 mt-1 text-sm bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Repite tu nueva contraseña"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm"
                  >
                    Guardar Nueva Contraseña
                  </button>
                </form>
              )}
            </div>
            
            <button 
              onClick={() => navigate('/feed')}
              className="w-full px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Volver al Feed
            </button>
          </div>
        ) : null}
      </main>
      
    </div>
  );
};