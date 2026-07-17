import { useNavigate, Link } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Barra de Navegación Básica */}
      <nav className="flex items-center justify-between p-4 text-white bg-blue-600 shadow-md">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/feed')}>Mi App</h1>
          <Link to="/me" className="text-sm font-semibold underline">Mi Perfil</Link>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm font-semibold bg-blue-700 rounded hover:bg-blue-800 transition-colors"
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido del Perfil */}
      <main className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Usuario Simulado</h2>
            <p className="text-gray-500">usuario@correo.com</p>
          </div>
          <hr className="border-gray-200" />
          <button 
            onClick={() => navigate('/feed')}
            className="w-full px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
          >
            Volver al Feed
          </button>
        </div>
      </main>
    </div>
  );
};